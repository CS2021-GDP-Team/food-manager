import time
import requests
import json
import re
from parse import parse
from dbaccessor import DBAccessor

def fetch_items_from_file(path):
	with open(path, 'r') as f:
		js = json.load(f)
	return js

db = DBAccessor()

for item in fetch_items_from_file('result'):
	recipe = db.get_recipe_by_name(item['name'])
	if not recipe:
		recipe_id = db.insert_recipe(item['name'], item['url'])
	else:
		recipe_id = recipe['id']

	names = item['recipe_ingredients']['names']
	amounts = item['recipe_ingredients']['amounts']
	url = item['url']

	for i in range(len(names)):
		ing = db.get_ingredient_by_name(names[i])
		if not ing:
			ing_id = db.insert_ingredient(names[i])
		else:
			ing_id = ing['id']
		
		recipe_ing = db.get_recipe_ingredient_by_recipe_ingredient(recipe_id, ing_id)
		if not recipe_ing:
			amount = int(float(re.sub('(\d+)(g|ml)', '\\1', amounts[i])))
			recipe_ing_id = db.insert_recipe_ingredient(recipe_id, ing_id, amount)
db.commit()
