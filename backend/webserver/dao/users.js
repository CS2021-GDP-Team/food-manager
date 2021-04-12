class Users {}

require('../utils/dbconnector')(Users);

Users.getUser = async (userId, password) => {
    const [row, fields] = await Users.db.execute("SELECT * FROM users WHERE user_id=? AND password=? LIMIT 1", [userId, password]);
    if (row.length === 0) {
        return null;
    }
    return {'id': row[0]['id'], 'userId': row[0]['user_id']};
}

module.exports = Users;
