from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import os

import database
from params import params

class Vectorizer:
    def __init__(self):
        self.config = {
            'user': os.environ["DBID"],
            'password': os.environ["DBPW"],
            'host': os.environ["DBHOST"],
            'database': os.environ["DBNAME"],
        }
        self.view_name = "ri_view"
        self.rem = None
        self.iids = None

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

    # 유통기한 가중치 함수
    def user_weight(self, days):
        return 1+(1/(days + 1.1)) # 임시

    def user_embedding(self, ingredients):
        udf = pd.DataFrame(ingredients, columns=['iid','days'])
        udf["weight"] = self.user_weight(udf["days"])
        uem = pd.pivot_table(udf, index=None, columns='iid', values='weight').fillna(0)
        for i in self.iids:
            if i not in uem:
                uem[i] = 0
        uem = uem.reindex(sorted(uem.columns), axis=1)
        return uem

    def recommend_recipes(self, ingredients, start=None, end=None): # form of ingredients: ['ing1,ing2,ing3']
        if (start is None) and (end is None):
            # top 10
            start = 0
            end = 10
        print(start,"~", end)
        
        uem = self.user_embedding(ingredients)
        print("user X ingredients:\t",uem.shape)

        sim_ing = cosine_similarity(uem, self.rem).argsort()[:, ::-1]
        print("user X recipes: \t",sim_ing.shape)
        
        if sim_ing.shape[1] < end:
            sim_idx = sim_ing[:, start:].reshape(-1)
        else:
            sim_idx = sim_ing[:, start:end].reshape(-1)
        return sim_idx.tolist()

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
    
    ids = [1,3,13,87,112,134,152]
    days = [90,20,0,1,28,20,3]
    info = list(zip(ids,days))
    print(info)
    result = vec.recommend_recipes(info)
    print(result)
    vec.print_recipe_names(result)
    vec.disconnect_database()
    
