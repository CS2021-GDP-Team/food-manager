class Users {}

require('../utils/dbconnector')(Users);

Users.createUser = async (userId, password) => {
	await Users.db.execute("INSERT INTO users(user_id, password) values(?, ?)", [userId, password]);
}

Users.deleteUser = async (id) => {
	await Users.db.execute("DELETE FROM users WHERE id=?", [id]);
}

Users.getUser = async (userId, password) => {
    const [row, fields] = await Users.db.execute("SELECT * FROM users WHERE user_id=? AND password=? LIMIT 1", [userId, password]);
    if (row.length === 0) {
        return null;
    }
    return {'id': row[0]['id'], 'userId': row[0]['user_id']};
}

module.exports = Users;
