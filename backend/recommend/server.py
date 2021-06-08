from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import sys,os
import traceback
import vectorize
import match
from datetime import datetime

host = os.environ["DBHOST"]
post = 8080

# 서버 결과 출력을 위해 추가
def flush():
    sys.stdout.flush()
    sys.stderr.flush()

class RecommendHandler(BaseHTTPRequestHandler):
    vec = None
    mat = None

    def _set_headers(self, status):
        self.send_response(status)
        self.send_header("Content-type", 'application/json') # request and response only in json
        self.end_headers()

    def _json(self, data):
        self._set_headers(200)
        self.wfile.write(bytes(json.dumps(data), 'utf-8'))
        flush()

    def _error(self, err_msg):
        self._set_headers(400)
        response = {
            "message" : err_msg
        }
        self.wfile.write(bytes(json.dumps(response), 'utf-8'))
        flush()

    def do_GET(self):
        data = "server test"
        json = {'message': data}
        self._json(json)

    def do_POST(self):
        if self.headers['content-type'] != 'application/json':
            self._error("Content type error: use json to send data")

        content_length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(content_length))
        if self.path == "/recommend":
            self.checkParameter(body, "ingredientInfo")
            self.handleRecommend(body)
        elif self.path == "/ingredient":
            self.checkParameter(body, "ingredientName")
            self.handleIngredient(body)

    def handleRecommend(self, body):
        ingredients = self.preprocessUserFridge(body["ingredientInfo"])
        start = body["start"] if "start" in body else None
        end = body["end"] if "end" in body else None
        result = self.vec.recommend_recipes(ingredients, start, end)
        print(result,end="\n\n")
        return self._json(result)

    def handleIngredient(self, body):
        result = self.mat.get_matched_id(body["ingredientName"])
        print(result,end="\n\n")
        return self._json(result)

    def checkParameter(self, body, param):
        try:
            if param in body:
                print(body)
            else:
                self._error(f"{param} is missing")        
        except Exception as e:
            traceback.print_exc()
            self._error(f"An exception occured! e : {e}")

    def preprocessUserFridge(self, ingredientInfo):
        if ingredientInfo == []:
            return list(zip([1001,1002], [1,2]))
        ingredientIds = []
        ingredientName = []
        days = []
        for ing in ingredientInfo:
            ingredientIds.append(ing["ingredient_id"])
            if "ingredient_name" in ing:
                ingredientName.append(ing["ingredient_name"])
            else:
                ingredientName.append("none")
            if "expire_date" in ing and ing["expire_date"] is not None:
                _day = datetime.strptime(ing["expire_date"],"%Y-%m-%dT%H:%M:%S.000Z")
                day = (_day - datetime.now()).days
                if day < 0: day = 0
                days.append(day)
            else:
                days.append(1)
        print(ingredientName)
        return list(zip(ingredientIds, days))

class http_server:
    def __init__(self, vec, mat):
        RecommendHandler.vec = vec
        RecommendHandler.mat = mat
        server = HTTPServer((host, post), RecommendHandler)
        print("Server started on http://%s:%s" % (host, post))
        flush()

        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass

class main:
    def __init__(self):
        self.vec = vectorize.Vectorizer()
        self.vec.connect_database()
        self.vec.recipe_embedding()

        self.mat = match.Matcher()
        self.mat.connect_database()
        self.mat.ingredients_db()

        self.server = http_server(self.vec, self.mat)

if __name__ == "__main__":        
    m = main()