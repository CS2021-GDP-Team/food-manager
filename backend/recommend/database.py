import mysql.connector
from mysql.connector import errorcode
import os

# https://dev.mysql.com/doc/connector-python/en/

class DBConnector:
    def __init__(self, host, user, password, database):
        self.database = database
        try:
            self.cnx = mysql.connector.connect(user=user,password=password,host=host,database=database,port=3306,charset='utf8')
        except mysql.connector.Error as err:
            print(err)
        self.curs = self.cnx.cursor()
        print("Databse '{}' connected".format(database))

    def close(self):
        self.fetchall()
        self.curs.close()
        self.cnx.close()
        print("Database disconnected")

    def execute(self, query, args={}):
        self.curs.execute(query.format(args))

    def fetchall(self):
        return self.curs.fetchall()

    def check_view(self):
        self.execute("show full tables in {} where table_type like '%VIEW%'", (self.database))
        if not self.fetchall():
            return False
        return True
        
    def create_view(self, view_name):
        if self.check_view():
            print("Views already exists")
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
            print("Views are created")
            self.execute('show tables')
            print(self.fetchall())
        else:
            print("Error occurred")




if __name__ == '__main__':
    config = {
    'user': os.environ["DBID"],
    'password': os.environ["DBPW"],
    'host': os.environ["DBHOST"],
    'database': 'food_manager',
    }
    view_name = "ri_view"

    db = DBConnector(**config)
    
    db.execute("show tables")
    row = db.fetchall()
    print(row)

    print(db.check_view())
    db.create_view(view_name)

    db.close()