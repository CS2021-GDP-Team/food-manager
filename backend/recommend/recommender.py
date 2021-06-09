
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

"""
유통기한 가중치 함수
input: pandas series
output: pandas series or list
"""

def user_weight(days):
    return 1+(1/(days + 1.1))


"""
유사도 계산 함수
output: list of recipe index correspondent to "rem" ordered by similarity
"""

def j_sim(uem, rem):
    uem = uem[0]
    ing_w_list=[]
    for rid in range(len(rem)): # 각각의 레시피마다 유저 iid 비교
        ing_w=0 # 레시피별 가중치 저장
        for iid in range(len(uem)):
            # 레시피에 해당하는 재료가 있을경우 유통기한*가중치를 빼줌
            if uem[iid]>0 and rem[rid,iid]>0:
                ing_w-=(uem[iid]*rem[rid,iid]) 
            # 없을시에 레시피 재료 가중치를 더함

            #else:
            #    ing_w+=rem[rid,iid]
            else:
                ing_w+=rem[rid,iid]*0.1
        ing_w_list.append(ing_w)
    return np.array(ing_w_list).argsort()

def cos_sim(uem, rem):
    return cosine_similarity(uem, rem).argsort()[:, ::-1].reshape(-1)
