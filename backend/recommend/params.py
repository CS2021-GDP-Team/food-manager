"""
레시피 임베딩을 제작하기 위한 가중치 파라미터.
m_w 는 주재료 가중치,
s_w 는 양념 가중치
b 는 원하는 값 사이를 얻기 위한 값.

rdf["weight"] = np.multiply(params["m_w"], rdf["is_main"]) - np.multiply(params["s_w"], rdf["is_seasoning"]) + params["b"]
"""

params = {
    "m_w": 5,
    "s_w":0,
    "b":0
}
