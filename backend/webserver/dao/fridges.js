class Fridges {}

require('../utils/dbconnector')(Fridges);

Fridges.getIngredientsByUserId = async (userId) => {
    const [row, fields] = await Fridges.db.execute("SELECT * FROM fridges f NATURAL JOIN (SELECT id as ingredient_id, name as ingredient_name FROM ingredients) i WHERE user_id = ?", [userId]);
	return row;
}

Fridges.getIngredientsByName = async (ingredientName) => {
    const [row, fields] = await Fridges.db.execute("SELECT * FROM fridges WHERE custom_ingredient=?", [ingredientName]);
	return row;
}

Fridges.insertIngredient = async (userId, ingredientId, ingredientName, putDate, expireDate) => {
	const found = await Fridges.getIngredientsByName(ingredientName)
	if (found.length > 0) throw `insertIngredient : userId(${userId}) already has ingredientName(${ingredientName})`
	putDate = putDate == null ? Math.floor(Date.now()/1000) : putDate;
    await Fridges.db.execute("INSERT INTO fridges(user_id, ingredient_id, put_date, expire_date, custom_ingredient) VALUES(?,?,from_unixtime(?),from_unixtime(?), ?)", [userId, ingredientId, putDate, expireDate, ingredientName]);
}

Fridges.updateIngredient = async (id, putDate, expireDate) => {
	let row, field;
	if (putDate == null){
		[row, field] = await Fridges.db.execute("UPDATE fridges SET expire_date=from_unixtime(?) WHERE id=? LIMIT 1", [expireDate, id]);
	}
	else{
		[row, field] = await Fridges.db.execute("UPDATE fridges SET put_date=from_unixtime(?), expire_date=from_unixtime(?) WHERE id=? LIMIT 1", [putDate, expireDate, id]);
	}
}

Fridges.deleteIngredient = async (id) => {
	const [row, field] = await Fridges.db.execute("DELETE FROM fridges WHERE id=?", [id]);
}

module.exports = Fridges;
