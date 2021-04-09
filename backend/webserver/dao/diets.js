class Diets {}

require('../utils/dbconnector')(Diets);

Diets.getRecipesByUserId = async (userId) => {
    const [row, fields] = await Diets.db.execute("SELECT * FROM diets WHERE user_id=?", [userId]);
	return row;
}

Diets.getRecipe = async (userId, recipeId) => {
    const [row, fields] = await Diets.db.execute("SELECT * FROM diets WHERE user_id=? AND recipe_id=?", [userId, recipeId]);
	return row;
}

Diets.insertRecipe = async (userId, recipeId, putDate) => {
	const found = await Diets.getRecipe(userId, recipeId)
	putDate = putDate == null ? Math.floor(Date.now()/1000) : putDate;
    let row, field
    // 날짜 업데이트, 카운트 +1
	if (found.length > 0){
        await Diets.updateRecipe(userId, recipeId, putDate);
        [row, field] = await Diets.db.execute("UPDATE diets SET count=count+1 WHERE user_id=? AND recipe_id=? LIMIT 1", [userId, recipeId]);
    }
    //새로 추가
    else{
        [row, field] = await Diets.db.execute("INSERT INTO diets(user_id, recipe_id, put_date) VALUES(?,?,from_unixtime(?))", [userId, recipeId, putDate]);
    }
    return row;
}

Diets.updateRecipe = async (userId, recipeId, putDate) => { 
    // 날짜만 수정
	let row, field;
    [row, field] = await Diets.db.execute("UPDATE diets SET put_date=from_unixtime(?) WHERE user_id=? AND recipe_id=? LIMIT 1", [putDate, userId, recipeId]);
    return row;
}

Diets.deleteRecipe = async (userId, recipeId) => {
	const found = await Diets.getRecipe(userId, recipeId)
    if(found.length == 0) return;
    let row, field
    // 카운트 -1
    if(found[0]["count"] > 1){
        [row, field] = await Diets.db.execute("UPDATE diets SET count=count-1 WHERE user_id=? AND recipe_id=? LIMIT 1", [userId, recipeId]);
    }
    // 아예 제거
    else{
	    [row, field] = await Diets.db.execute("DELETE FROM diets WHERE user_id=? AND recipe_id=?", [userId, recipeId]);
    }
    return row;
}

module.exports = Diets;
