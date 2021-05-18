const mysql = require('mysql2');

//mysql setting. 'mysql2' is used for async mysql interfaces.
//비동기적으로 DB 연결이 수립되기에 Object.freeze() 는 연결이 수립된 이후에 호출한다.
module.exports = async (proto) => {
    const db__ = await mysql.createPool({
        host: process.env['DBHOST'],
        user: process.env['DBID'],
        password: process.env['DBPW'],
        database: 'food_manager_new'
    });
    proto.db = await db__.promise();
    Object.freeze(proto);
};