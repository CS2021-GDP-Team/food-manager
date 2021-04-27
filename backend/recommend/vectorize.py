from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import os

import database

class Vectorizer:
    def __init__(self):
        self.config = {
            'user': os.environ["DBID"],
            'password': os.environ["DBPW"],
            'host': os.environ["DBHOST"],
            'database': 'food_manager',
        }
        self.view_name = "ri_view"
        self.ingredient_column = "ingredients"

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
        self.db.execute('select * from '+self.view_name+' where {} is not null',(self.ingredient_column))
        # self.db.execute('select * from '+self.view_name+' where {} is not null limit 5',(self.ingredient_column))
        row = self.db.fetchall()
        if not row:
            print("Cannot fetch data")
            return
        self.recipe_idx = []
        for r in row:
            self.recipe_idx.append(r[0]) # index column must be the first one
        df = pd.DataFrame(row, columns=columns)
        
        # Vectorize recipes
        self.cv = CountVectorizer(ngram_range=(1,1))
        self.cv_ing = self.cv.fit_transform(df[self.ingredient_column])
        # print(self.cv.vocabulary_)
        print("recipe X ingredients:\t",self.cv_ing.shape)

    def recommend_recipes(self, ingredients, start, end): # form of ingredients: ['ing1,ing2,ing3']
        if (start is None) and (end is None):
            # top 10
            start = 0
            end = 10
        print(start,"~", end)
        cv_user = self.cv.transform(ingredients)
        print("user X ingredients:\t",cv_user.shape)
        sim_ing = cosine_similarity(cv_user, self.cv_ing).argsort()[:, ::-1]
        print("user X recipes: \t",sim_ing.shape)
        
        if sim_ing.shape[1] < end:
            sim_idx = sim_ing[:, start:].reshape(-1)
        else:
            sim_idx = sim_ing[:, start:end].reshape(-1)
        result = []
        for i in sim_idx:
            result.append(self.recipe_idx[i])
        return result

    def print_recipe_names(self, recipe_idx):
        self.db.execute("SELECT * FROM "+self.view_name+" WHERE FIND_IN_SET(id, '{}')",recipe_idx)
        for r in self.db.fetchall():
            print(r)
        


if __name__ == '__main__':
    vec = Vectorizer()
    vec.connect_database()

    vec.recipe_embedding()
    result = vec.recommend_recipes(['고구마,설탕,호두,은행'])
    print("recommended recipe idx:",result)

    vec.print_recipe_names(result)

    vec.disconnect_database()
    
