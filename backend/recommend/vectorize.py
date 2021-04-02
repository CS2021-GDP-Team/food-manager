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
            'host': '127.0.0.1',
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
        self.db.execute('select * from {} limit 5',(self.view_name))
        row = self.db.fetchall()
        self.df = pd.DataFrame(row, columns=columns)
        
        # Vectorize recipes
        self.cv = CountVectorizer(ngram_range=(1,1))
        self.cv_ing = self.cv.fit_transform(self.df[self.ingredient_column])
        # print(self.cv.vocabulary_)
        print("recipe X ingredients:",self.cv_ing.shape)

    def recommend_recipes(self, ingredients, top=10):
        cv_user = self.cv.transform(ingredients)
        print("user X ingredients:",cv_user.shape)
        sim_ing = cosine_similarity(cv_user, self.cv_ing).argsort()[:, ::-1]
        print("user X recipes:",sim_ing.shape)
        
        sim_idx = sim_ing[:, :top].reshape(-1)
        
        result = self.df.iloc[sim_idx]
        return result
        


if __name__ == '__main__':
    vec = Vectorizer()
    vec.connect_database()

    vec.recipe_embedding()
    result = vec.recommend_recipes(['고구마,설탕,호두,은행'])
    print(result)

    vec.disconnect_database()
    
