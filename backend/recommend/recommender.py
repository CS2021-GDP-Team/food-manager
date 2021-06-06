import pandas as pd
import numpy as numpy
from sklearn.metrics.pairwise import cosine_similarity

def eu_distance(uem, rem):
    ing_w_list=[]
    for rid in range(len(rem)): # 각각의 레시피마다 유저 iid 비교
        ing_w=0 # 레시피별 가중치 저장
        for iid in range(len(uem)):
            # 레시피에 해당하는 재료가 있을경우 유통기한*가중치를 빼줌
            if uem[iid]>0 and rem[rid,iid]>0:
                ing_w-=(uem[iid]*rem[rid,iid]) 
            # 없을시에 레시피 재료 가중치를 더함
            else:
                ing_w+=rem[rid,iid]
        ing_w_list.append(ing_w)
    result=np.array(ing_w_list).argsort()
    return recipes.iloc[result[:10].reshape(-1)]

def cos_sim(uem, rem):
    return cosine_similarity(uem, rem).argsort()[:, ::-1]