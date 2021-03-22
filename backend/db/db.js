//const async = require('async');
const mysql = require('mysql2');

class DB {};

DB.getUser = async (user) => {
	console.log(user);
	var [row, fields] = await DB.db.execute("SELECT * FROM users WHERE user_id=? AND password=? LIMIT 1", [user.userId, user.password]);
	if(row.length == 0){
		return null;
	}
	return row[0];
}

DB.getUserIdFromSession = async (jsession) => {
	if(jsession == 'test'){
		return 123;
	}
	return null;
}

//mysql setting. 'mysql2' is used for async mysql interfaces.
//비동기적으로 DB 연결이 수립되기에 Object.freeze는 연결이 수립된 이후에 호출된다.
(async () => {
	const db__ = await mysql.createPool({
		host:process.env['DBHOST'],
		user:process.env['DBID'],
		password:process.env['DBPW'],
		database:'food_manager'});
	DB.db = await db__.promise();
	Object.freeze(DB);
})();

module.exports = DB;
