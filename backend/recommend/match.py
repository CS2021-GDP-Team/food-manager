import os, re
import database

"""
식재료의 이름을 통일 시키기 위한 클래스 및 메소드.
초기 문자열을 cleansing 한 후, 재료 DB 중 가장 유사한 재료명을 찾는다.
자카드 유사도를 사용하였다.
"""

rep = {
    "다진":"",
    "삶은":"",
    "재료":"",
    "달걀":"계란",
    "쇠":"소",
    "후춧" : "후추",
    "케찹" :"케첩",
    "강황" : "카레",
    "와사비" :"고추냉이",
    "땡초":"청양고추",
    "스위트콘" : "옥수수",
    "국수":"소면",
    "스파게티":"파스타",
    "시나몬":"계피",
    "요구르트":"요거트",
    "쨈":"잼",
    "가쓰오부시":"가다랑어포",
    "크래미":"게맛살",
    "돼지호박":"주키니호박",
    "햇반":"밥",
    "새싹":"어린잎채소",
    "사골":"육수",
    "오뎅":"어묵",
    "허브":"민트",
    "야채":"채소"
}

rep = dict((re.escape(k), v) for k, v in rep.items()) 
pattern = re.compile("|".join(rep.keys()))

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
        try:
            text = ''.join(re.compile('[가-힣+]').findall(ing))
            text = pattern.sub(lambda m: rep[re.escape(m.group(0))], text)
        except Exception as e:
            print(e, text)
            return ing
        return text

if __name__ == '__main__':
    mat = Matcher()
    mat.connect_database()
    mat.ingredients_db()
    print(mat.get_matched_id("재료: 가쓰오부시와 달걀과 다짐육(쇠고기)"), end="\n\n")
    print(mat.get_matched_id("오렌지"), end="\n\n")
    print(mat.get_matched_id("오렌지주스"), end="\n\n")
    print(mat.get_matched_id("고구마"), end="\n\n")
    print(mat.get_matched_id("고구마전분"), end="\n\n")
    print(mat.get_matched_id("곰곰 돌돌말이 무연골 대패 삼겹살 (냉동), 1kg, 1개입"), end="\n\n")
    print(mat.get_matched_id("제스프리 썬골드 키위, XL, 1.5kg(12개입), 1개"), end="\n\n")
    print(mat.get_matched_id("충남세도 GAP 인증 대추방울토마토, 2kg, 1박스"), end="\n\n")

    mat.disconnect_database()