import os, re
import database

class Matcher:
    def __init__(self):
        print("==Initialize matcher==")
        self.config = {
            'user': os.environ["DBID"],
            'password': os.environ["DBPW"],
            'host': os.environ["DBHOST"],
            'database': os.environ["DBNAME"],
        }
        self.ingredientDB = "ingredients"
        self.ings = []

    def connect_database(self):
        self.db = database.DBConnector(**self.config)

    def disconnect_database(self):
        self.db.close()

    def get_matched_id(self, user_ing):
        # Select candidates
        res, err = self.jaccard(user_ing)

        # Most matched
        res.sort(key=lambda x:x[2], reverse=True)
        for ing in res:
            if user_ing.find(ing[1]) != -1:
                return {"matchedId": ing[0], "matchedName":ing[1]}
        return {"matchedId": res[0][0], "matchedName":res[0][1]}

    def ingredients_db(self):
        self.db.execute('select id, name from ' + self.ingredientDB)
        row = self.db.fetchall()
        if not row:
            print("Cannot fetch data")
            return
        for r in row:
            self.ings.append(list(r))
        print("Length of ingredients: ", len(self.ings))

    def jaccard(self, user_ing):
        result = []
        errors = []
        str1 = self.cleansing(user_ing)
        print("Cleansed user ingredient:", str1)
        for ing in self.ings:
            str2 = self.cleansing(ing[1]) # 재료 db 전처리 시 삭제
            try:
                intersection = len(set(str1) & set(str2))
                if intersection == 0.0:
                    continue
                union = len(str1 + str2)
                simmilarity = (intersection / union)
                if simmilarity > 0.13: # 정확도 조정
                    result.append([ing[0], str2, simmilarity])
            except:
                errors.append(ing)
        return result, errors

    def cleansing(self, ing):
        return ''.join(re.compile('[가-힣+]').findall(ing))

if __name__ == '__main__':
    mat = Matcher()
    mat.connect_database()
    print(mat.get_matched_id("풋사과"), end="\n\n")
    print(mat.get_matched_id("버섯"), end="\n\n")
    print(mat.get_matched_id("곰곰 돌돌말이 무연골 대패 삼겹살 (냉동), 1kg, 1개입"), end="\n\n")
    print(mat.get_matched_id("제스프리 썬골드 키위, XL, 1.5kg(12개입), 1개"), end="\n\n")
    print(mat.get_matched_id("충남세도 GAP 인증 대추방울토마토, 2kg, 1박스"), end="\n\n")

    mat.disconnect_database()