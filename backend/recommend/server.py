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
        self.body = json.loads(self.rfile.read(content_length))
        if self.path == "/recommend":
            self.checkParameter("ingredientInfo")
            self.handleRecommend()
        elif self.path == "/ingredient":
            self.checkParameter("ingredientName")
            self.handleIngredient()

    def handleRecommend(self):
        ingredients = self.preprocessUserFridge(self.body["ingredientInfo"])
        print(ingredients)
        vec = vectorize.Vectorizer()
        vec.connect_database()
        vec.recipe_embedding()
        result = vec.recommend_recipes(ingredients, self.body["start"], self.body["end"])
        print(result)
        return self._json(result)

    def handleIngredient(self):
        mat = match.Matcher()
        mat.connect_database()
        result = mat.get_matched_id(self.body["ingredientName"])
        print(result)
        mat.disconnect_database()
        return self._json(result)

    def checkParameter(self, param):
        try:
            if param in self.body:
                print(self.body)
            else:
                self._error(f"{param} is missing")        
        except Exception as e:
            traceback.print_exc()
            self._error(f"An exception occured! e : {e}")

    def preprocessUserFridge(self, ingredientInfo):
        if ingredientInfo == []:
            return list(zip([1,2], [1,2]))
        ingredientIds = []
        ingredientName = []
        days = []
        for ing in ingredientInfo:
            ingredientIds.append(ing["ingredient_id"])
            ingredientName.append(ing["ingredient_name"])
            _day = datetime.strptime(ing["expire_date"],"%Y-%m-%dT%H:%M:%S.000Z")
            day = (_day - datetime.now()).days
            if day < 0: day = 0
            days.append(day)
        print(ingredientName)
        return list(zip(ingredientIds, days))


if __name__ == "__main__":        
    httpd = HTTPServer((host, post), RecommendHandler)
    print("Server started on http://%s:%s" % (host, post))
    flush()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print("Server stopped.")
