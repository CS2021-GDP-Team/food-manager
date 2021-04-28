# Python Web Server

## Installation
```
pip3 install -r requirements.txt
```

## Run a API server
```
python3 server.py
```

## Run test codes
```

```

## Description
* database.py

    - connect to mysql database
    - check if view for vectorization is created
    - if no view has been created, create view from existing tables

* vectorize.py

    - make db connection and fetch data from view
    - vectorize recipes by ingredients, using CountVectorizer from sklearn
    - receive user ingredients and create user vector to calculate similarity with recipe vectors
    - return recommended recipe ids

* server.py

    - get request from POST body and send the data to vectorizer


## Recommender System

1. (num_of_recipes, num_of_ingredients) : vectorize recipe by contained ingredients
2. (1, num_of_ingredients) : vectorize user by stored ingredients
3. (1, num_of_recipes) : calculate user-recipe simularity with whole recipes