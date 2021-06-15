/**
 * 사용자 DB CRUD 구현
 */

class Users {}

require('../utils/dbconnector')(Users);

Users.createUser = async (userId, password) => {
	await Users.db.execute("INSERT INTO users(user_id, password) values(?, ?)", [userId, password]);
}

Users.deleteUser = async (id) => {
	await Users.db.execute("DELETE FROM users WHERE id=?", [id]);
}

Users.getUser = async (userId, password) => {
    const [row, fields] = await Users.db.execute("SELECT id, user_id FROM users WHERE user_id=? AND password=? LIMIT 1", [userId, password]);
    if (row.length === 0) {
        return null;
    }
    return {'id': row[0]['id'], 'userId': row[0]['user_id']};
}

Users.getUserInfo = async (userId) => {
    const [row, fields] = await Users.db.execute("SELECT * FROM users WHERE id=? LIMIT 1", [userId]);
    delete row[0]["password"];
    return row;
}

Users.updateUserInfo = async (userId, query) => {
	let row, field;
    query = "UPDATE users SET " + query +" WHERE id=? LIMIT 1";
    [row, field] = await Users.db.execute(query, [userId]);
}


module.exports = Users;
