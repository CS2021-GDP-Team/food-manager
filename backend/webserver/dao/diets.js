class Diets {}

require('../utils/dbconnector')(Diets);

Diets.getRecipesByUserId = async (userId) => {
    const [row, fields] = await Diets.db.execute("SELECT id, name, put_date, diet_id FROM recipes r JOIN ( SELECT id as diet_id, recipe_id, put_date FROM diets WHERE user_id=? ORDER BY put_date DESC) d ON r.id = d.recipe_id", [userId]);
	return row;
}

Diets.getRecipe = async (userId, recipeId) => {
    const [row, fields] = await Diets.db.execute("SELECT * FROM diets WHERE user_id=? AND recipe_id=?", [userId, recipeId]);
	return row;
}

Diets.insertRecipe = async (userId, recipeId, putDate) => {
	putDate = putDate == null ? Math.floor(Date.now()/1000) : putDate;
    await Diets.db.execute("INSERT INTO diets(user_id, recipe_id, put_date) VALUES(?,?,from_unixtime(?))", [userId, recipeId, putDate]);
}

Diets.updateRecipe = async (userId, dietId, putDate) => { 
    const [row, field] = await Diets.db.execute("UPDATE diets SET put_date=from_unixtime(?) WHERE user_id=? AND id=?", [putDate, userId, dietId]);
    console.log(row);
    console.log(field);
}

Diets.deleteRecipe = async (userId, dietId) => {
	const [row, field] = await Diets.db.execute("DELETE FROM diets WHERE user_id=? AND id=?", [userId, dietId]);
}

module.exports = Diets;
