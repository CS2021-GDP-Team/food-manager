import time
import requests
import json
import re
from parse import parse
from dbaccessor import DBAccessor

db = DBAccessor()

for recipe in db.get_recipe():
    recipe_id = recipe['id']
    recipe_name = recipe['name']
    url = recipe['url']

    print(f'recipe_name {recipe_name} : ', end='')

    recipe_ingredients = db.get_recipe_ingredient_by_recipe_id(recipe_id)
    total_grams = 0.0
    for recipe_ingredient in recipe_ingredients:
            total_grams += recipe_ingredient['grams']
    for recipe_ingredient in recipe_ingredients:
            ratio = recipe_ingredient['grams']/total_grams
            print(f'{recipe_ingredient["ingredient_id"]} {recipe_ingredient["grams"]} {ratio}', end='')
            db.set_recipe_ingredient_ratio(recipe_ingredient['id'], ratio)
            print()
db.commit()
