const users = require('../dao/users.js');
const recipes = require('../dao/recipes.js');
const recipeIngredients = require('../dao/recipeIngredients.js');
const fridges = require('../dao/fridges.js');
const diets = require('../dao/diets.js')
const favorites = require('../dao/favorites.js')
const barcodes = require('../dao/barcodes.js');
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

Service.getUserInfo = async (userId) => {
    return await users.getUserInfo(userId);
}

Service.updateUserInfo = async (userId, height, weight, isNotified, notifyTime, filepath) => {
	var query = ""
	if(height && height != ""){
		query += "height="+height.toString()+", ";
	}
	if(weight && weight != ""){
		query += "weight="+weight.toString()+", ";
	}
	if(isNotified && isNotified != ""){
		query += "is_notified="+isNotified.toString()+", ";
	}
	if(notifyTime && notifyTime != ""){
		query += "notify_time=\""+notifyTime.toString()+"\", ";
	}
	if(filepath && filepath != ""){
		filepath = filepath.toString().replace('\\', '/');
		query += "filepath=\""+filepath+"\", ";
	}
	if(query == "") return;

	query = query.slice(0,-2);
	await users.updateUserInfo(userId, query);
}

Service.recommendRecipes = async (userId, start, end) => {
	// 유저의 재료 정보 검색
	const ingredientInfo = await fridges.getIngredientsByUserId(userId);

	// 파이썬 서버 연결 -> 레시피 아이디 반환
    const response = await fetch('http://localhost:8080/recommend', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"ingredientInfo":ingredientInfo, "start":start, "end":end})
    })
	const recipeIds = await response.json();

    // 레시피 아이디로 다시 db 검색
    const recipesFound = await recipes.getRecipes(recipeIds);
    if (recipesFound == null){
        throw new APIError(sc.HTTP_BAD_REQUEST, '레시피를 찾을 수 없습니다.')
    }
    return recipesFound;
}


Service.ratios = {};
Service.recommendRecipes2 = async (userId, start, end) => {
	if (recipeIngredients.dirty) {
		const rows = await recipeIngredients.get();
		for (var i = 0; i<rows.length; i++) {
			if (!(rows[i]['recipe_id'] in Service.ratios)) {
				Service.ratios[rows[i]['recipe_id']] = {}
			}
			Service.ratios[rows[i]['recipe_id']][rows[i]['ingredient_id']] = rows[i]['ratio']
		}
		recipeIngredients.dirty = false;
	}

	ingredients = await Service.getUserIngredients(userId);
	scores = []
	user_ingredients = []
	for (var i = 0; i<ingredients.length; i++) {
		user_ingredients.push(ingredients[i]['ingredient_id'])
	}
	for (var recipe_id in Service.ratios) {
		var score = 0;
		for (var i = 0; i<user_ingredients.length; i++){
			if (user_ingredients[i] in Service.ratios[recipe_id]) {
				score += Service.ratios[recipe_id][user_ingredients[i]]
			}
		}
		if (score == 0) {
			continue;
		}
		scores.push({'recipe_id':recipe_id, 'score':score});
	}
	scores.sort((a, b) => {return b['score'] - a['score'];})

	const recipesFound = await recipes.getRecipes(scores.map((item) => {return item['recipe_id']}));
        if (recipesFound == null){
        throw new APIError(sc.HTTP_BAD_REQUEST, '레시피를 찾을 수 없습니다.')
        }

        for (var i = 0; i<recipesFound.length; i++) {
                recipesFound[i] = {...recipesFound[i], 'score':scores[i]['score']}
        }
        return recipesFound;
}

Service.getRecipes = async (recipeIds) => {
	return await recipes.getRecipes(recipeIds);
}

Service.getUserIngredients = async (userId) => {
	return await fridges.getIngredientsByUserId(userId);
}

Service.insertUserIngredient = async (userId, ingredientName, putDate, expireDate) => {
	// 파이썬 서버 연결 -> 재료 아이디 반환
    const response = await fetch('http://localhost:8080/ingredient', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"ingredientName":ingredientName})
    })
	const ingredientId = await response.json();

	await fridges.insertIngredient(userId, ingredientId["matchedId"], ingredientName, putDate, expireDate);
}

Service.updateUserIngredient = async (id, putDate, expireDate) => {
	await fridges.updateIngredient(id, putDate, expireDate);
}

Service.deleteUserIngredient = async (id) => {
	await fridges.deleteIngredient(id);
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
	if (score != 0){
		await favorites.insertFavorite(userId, recipeId, score);
		await recipes.updateLikes(recipeId, score);
	}
}

Service.deleteFavorite = async (userId, recipeId) => {
	await favorites.deleteFavorite(userId, recipeId);
}

Service.getBarcode = async (barcode_number) => {
	const data = await barcodes.getBarcode(barcode_number);
    if (data.length == 0) {
        throw new APIError(sc.HTTP_BAD_REQUEST, '잘못된 barcode_number 이거나 존재하지않는 정보입니다');
    }
    return data;
}

Service.insertBarcode = async (barcode_number, name, hours, url) => {
	await barcodes.insertBarcode(barcode_number, name, hours, url);
}

Service.deleteBarcode = async (barcode_number) => {
	await barcodes.deleteBarcode(barcode_number);
}

Object.freeze(Service);
module.exports = Service;

