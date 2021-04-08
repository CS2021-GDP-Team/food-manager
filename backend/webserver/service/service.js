const users = require('../dao/users.js');
const recipes = require('../dao/recipes.js');
const APIError = require('../exceptions/apierror.js');
const sc = require('../enums/httpstatuscode.js');
const fetch = require("node-fetch")

class Service {}

Service.getUser = async (userId, password) => {
    const userFound = await users.getUser(userId, password);
    if (userFound == null) {
        throw new APIError(sc.HTTP_UNAUTHORIZED, '잘못된 userId 또는 password 이거나 존재하지않는 사용자입니다');
    }
    return userFound;
}

Service.recommendRecipes = async (userIngredients) => {
    // 파이썬 서버 연결 -> 레시피 아이디 반환
    var recipeIds = await fetch('http://localhost:8080', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"userIngredients":userIngredients})
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error));

    // 레시피 아이디로 다시 db 검색
    const recipesFound = await recipes.getRecipes(recipeIds);
    if (recipesFound == null){
        throw new APIError(sc.HTTP_BAD_REQUEST, '레시피를 찾을 수 없습니다.')
    }
    return recipesFound;
}

Object.freeze(Service);
module.exports = Service;
