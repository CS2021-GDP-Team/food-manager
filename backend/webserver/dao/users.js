const mysql = require('mysql2');

class Users {}

//mysql setting. 'mysql2' is used for async mysql interfaces.
//비동기적으로 DB 연결이 수립되기에 Object.freeze() 는 연결이 수립된 이후에 호출한다.
(async () => {
    const db__ = await mysql.createPool({
        host: process.env['DBHOST'],
        user: process.env['DBID'],
        password: process.env['DBPW'],
        database: 'food_manager'
    });
    Users.db = await db__.promise();
    Object.freeze(Users);
})();

Users.getUser = async (userId, password) => {
    const [row, fields] = await Users.db.execute("SELECT * FROM users WHERE user_id=? AND password=? LIMIT 1", [userId, password]);
    if (row.length === 0) {
        return null;
    }
    return {'id': row[0]['id'], 'userId': row[0]['user_id']};
}

module.exports = Users;
