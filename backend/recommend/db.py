import mysql.connector
from mysql.connector import errorcode
import os

# https://dev.mysql.com/doc/connector-python/en/

class DBConnector:
    def __init__(self, host, user, password, database):
        self.database = database
        try:
            self.cnx = mysql.connector.connect(user=user,password=password,host=host,database=database)
        except mysql.connector.Error as err:
            print(err)
        self.curs = self.cnx.cursor()

    def close(self):
        self.curs.fetchall()
        self.curs.close()
        self.cnx.close()

    def execute(self, query, args={}):
        self.curs.execute(query.format(args))

    def check_view(self):
        self.execute("show full tables in food_manager where table_type like '%VIEW%'", (self.database))
        if not db.curs.fetchall():
            return False
        return True
        
    def create_view(self, view_name):
        if self.check_view():
            print("views already exists")
            return

        self.execute(
            '''
            create view ri_joined_view as
            (select ri.id, ri.recipe_id, ri.ingredient_id, r.name as recipe_name, i.name as ingredient_name
            from ingredients i
                inner join recipe_ingredients ri on i.id = ri.ingredient_id
                inner join recipes r on ri.recipe_id = r.id
            order by ri.id);
            '''
        )
        self.execute(
            '''
            create view {} as
            (select r.id,r.name, ri.ingredients from recipes r
            left join (
            select recipe_id, GROUP_CONCAT(ingredient_name SEPARATOR ', ') as ingredients
            from ri_joined_view
            group by recipe_id
            ) ri
            on r.id = ri.recipe_id
            );
            '''
        , (view_name))

        if self.check_view():
            print("views are created")
            self.execute('show tables')
            print(self.curs.fetchall())
        else:
            print("error occurred")

    


if __name__ == '__main__':
    config = {
    'user': os.environ["DBID"],
    'password': os.environ["DBPW"],
    'host': '127.0.0.1',
    'database': 'food_manager',
    }
    view_name = "ri_view"

    db = DBConnector(**config)
    
    db.execute("show tables")
    row = db.curs.fetchall()
    print(row)

    print(db.check_view())
    db.create_view(view_name)

    db.close()