class Fridges {}

require('../utils/dbconnector')(Fridges);

Fridges.getIngredientsByUserId = async (userId) => {
    const [row, fields] = await Fridges.db.execute("SELECT * FROM fridges WHERE user_id=?", [userId]);
	return row;
}

Fridges.getIngredient = async (userId, ingredientId) => {
    const [row, fields] = await Fridges.db.execute("SELECT * FROM fridges WHERE user_id=? AND ingredient_id=?", [userId, ingredientId]);
	return row;
}

Fridges.insertIngredient = async (userId, ingredientId, putDate, expireDate) => {
	const found = await Fridges.getIngredient(userId, ingredientId)
	if (found.length > 0) throw `insertIngredient : userId(${userId}) already has ingredientId(${ingredientId})`
	putDate = putDate == null ? Math.floor(Date.now()/1000) : putDate;
    await Fridges.db.execute("INSERT INTO fridges(user_id, ingredient_id, put_date, expire_date) VALUES(?,?,from_unixtime(?),from_unixtime(?))", [userId, ingredientId, putDate, expireDate]);
}

Fridges.updateIngredient = async (userId, ingredientId, putDate, expireDate) => {
	let row, field;
	if (putDate == null){
		[row, field] = await Fridges.db.execute("UPDATE fridges SET expire_date=from_unixtime(?) WHERE user_id=? AND ingredient_id=? LIMIT 1", [expireDate, userId, ingredientId]);
	}
	else{
		[row, field] = await Fridges.db.execute("UPDATE fridges SET put_date=from_unixtime(?), expire_date=from_unixtime(?) WHERE user_id=? AND ingredient_id=? LIMIT 1", [putDate, expireDate, userId, ingredientId]);
	}
}

Fridges.deleteIngredient = async (userId, ingredientId) => {
	const [row, field] = await Fridges.db.execute("DELETE FROM fridges WHERE user_id=? AND ingredient_id=?", [userId, ingredientId]);
}

module.exports = Fridges;
