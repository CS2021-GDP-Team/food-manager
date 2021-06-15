import pandas as pd
import numpy as np
import os

import database
import recommender
from params import params

"""
레시피 임베딩을 생성 후 클래스 변수로 가지고 있는다.
재료와 유통기한의 튜플 리스트가 입력으로 주어지면
레시피 임베딩 중 가장 유사한 레시피 아이디를 반환한다.

유사도 함수와 가중치는 변경 가능하다.
"""

class Vectorizer:
    def __init__(self):
        print("==Initialize vectorizer==")
        self.config = {
            'user': os.environ["DBID"],
            'password': os.environ["DBPW"],
            'host': os.environ["DBHOST"],
            'database': os.environ["DBNAME"],
        }
        self.view_name = "ri_view"
        self.rem = None
        self.iids = None
        self.recommender = recommender.j_sim

    def connect_database(self):
        self.db = database.DBConnector(**self.config)
        self.db.create_view(self.view_name)

    def disconnect_database(self):
        self.db.close()

    def recipe_embedding(self):
        # Get column names
        self.db.execute('describe {}',(self.view_name))
        columns = []
        for column in self.db.fetchall():
            columns.append(column[0])
        
        # Get data
        self.db.execute('select * from {}',(self.view_name))
        row = self.db.fetchall()
        if not row:
            print("Cannot fetch data")
            return
        rdf = pd.DataFrame(row, columns=columns)

        # Make Embedding
        rdf["weight"] = np.multiply(params["m_w"], rdf["is_main"]) - np.multiply(params["s_w"], rdf["is_seasoning"]) + params["b"]
        rem = pd.pivot_table(rdf, index='recipe_id', columns='ingredient_id', values='weight').fillna(0)
        self.rem = rem

        # Get Ingredient Ids
        self.iids = self.rem.columns.tolist()
        print("recipe X ingredients:\t",self.rem.shape)

    def user_embedding(self, ingredients):
        udf = pd.DataFrame(ingredients, columns=['iid','days'])
        udf["weight"] = recommender.user_weight(udf["days"])
        uem = pd.pivot_table(udf, index=None, columns='iid', values='weight').fillna(0)
        for i in self.iids:
            if i not in uem:
                uem[i] = 0
        uem = uem.reindex(sorted(uem.columns), axis=1)
        return uem

    def recommend_recipes(self, ingredients, start=None, end=None): # form of ingredients: [(ing1, day1), (ing2, day2) ...]
        if (start is None) and (end is None):
            # top 10
            start = 0
            end = 10
        
        uem = self.user_embedding(ingredients)
        # print("user X ingredients:\t",uem.shape)

        sim_ing = self.recommender(uem.to_numpy(), self.rem.to_numpy())
        
        if len(sim_ing) < end:
            sim_idx = sim_ing[start:]
        else:
            sim_idx = sim_ing[start:end]

        return self.rem.iloc[sim_idx].index.tolist()

    def print_recipe_names(self, recipe_idx):
        num = len(recipe_idx)
        recipe_idx = ','.join(list(map(str, recipe_idx)))
        self.db.execute("SELECT name FROM recipes WHERE FIND_IN_SET(id, '{}')",recipe_idx)
        rec = self.db.fetchall()
        self.db.execute("SELECT ingredients FROM ri_str_view WHERE FIND_IN_SET(id, '{}')",recipe_idx)
        ing = self.db.fetchall()
        for i in range(num):
            print("recipe:", rec[i][0], "\ningredients:", ing[i][0],end="\n\n")


if __name__ == '__main__':
    vec = Vectorizer()
    vec.connect_database()

    vec.recipe_embedding()
    # 두부 된장 콩나물 표고버섯 토마토 메추리알
    ids = [1001,1005,1032,1065,1105,1147]
    days = [90,20,0,1,28,20,3]
    info = list(zip(ids,days))
    print(info)
    result = vec.recommend_recipes(info)
    print(result)
    vec.print_recipe_names(result)
    vec.disconnect_database()
    
