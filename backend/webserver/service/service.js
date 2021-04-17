const users = require('../dao/users.js');
const recipes = require('../dao/recipes.js');
const fridges = require('../dao/fridges.js');
const diets = require('../dao/diets.js')
const favorites = require('../dao/favorites.js')
const APIError = require('../exceptions/apierror.js');
const sc = require('../enums/httpstatuscode.js');
const fetch = require("node-fetch")

class Service {}

Service.createUser = async (userId, password) => {
	try{
		await users.createUser(userId, password);
	} catch (e){
		throw new APIError(sc.HTTP_BAD_REQUEST, e.message);
	}
}

Service.deleteUser = async (id) => {
	await users.deleteUser(id);
}

Service.getUser = async (userId, password) => {
    const userFound = await users.getUser(userId, password);
    if (userFound == null) {
        throw new APIError(sc.HTTP_UNAUTHORIZED, '잘못된 userId 또는 password 이거나 존재하지않는 사용자입니다');
    }
    return userFound;
}

Service.recommendRecipes = async (ingredientIds, start, end) => {
    // 파이썬 서버 연결 -> 레시피 아이디 반환
    const response = await fetch('http://localhost:8080', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"ingredientIds":ingredientIds, "start":start, "end":end})
    })
	const recipeIds = await response.json();

    // 레시피 아이디로 다시 db 검색
    const recipesFound = await recipes.getRecipes(recipeIds);
    if (recipesFound == null){
        throw new APIError(sc.HTTP_BAD_REQUEST, '레시피를 찾을 수 없습니다.')
    }
    return recipesFound;
}

Service.getRecipes = async (recipeIds) => {
	return await recipes.getRecipes(recipeIds);
}

Service.getUserIngredients = async (userId) => {
	return await fridges.getIngredientsByUserId(userId);
}

Service.insertUserIngredient = async (userId, ingredientId, putDate, expireDate) => {
	await fridges.insertIngredient(userId, ingredientId, putDate, expireDate);
}

Service.updateUserIngredient = async (userId, ingredientId, putDate, expireDate) => {
	await fridges.updateIngredient(userId, ingredientId, putDate, expireDate);
}

Service.deleteUserIngredient = async (userId, ingredientId) => {
	await fridges.deleteIngredient(userId, ingredientId);
}

Service.getUserRecipes = async (userId) => {
	return await diets.getRecipesByUserId(userId);
}

Service.insertUserRecipe = async (userId, recipeId, putDate) => {
	await diets.insertRecipe(userId, recipeId, putDate);
}

Service.updateUserRecipe = async (userId, dietId, putDate) => {
	await diets.updateRecipe(userId, dietId, putDate);
}

Service.deleteUserRecipe = async (userId, dietId) => {
	await diets.deleteRecipe(userId, dietId);
}

Service.getFavorites = async (userId) => {
	return await favorites.getFavoritesByUserId(userId);
}

Service.insertFavorite = async (userId, recipeId, score) => {
	await favorites.deleteFavorite(userId, recipeId);
	if (score != 0) await favorites.insertFavorite(userId, recipeId, score);
}

Service.deleteFavorite = async (userId, recipeId) => {
	await favorites.deleteFavorite(userId, recipeId);
}

Object.freeze(Service);
module.exports = Service;

