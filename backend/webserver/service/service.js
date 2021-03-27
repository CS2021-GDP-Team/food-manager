const users = require('../dao/users.js');
const APIError = require('../exceptions/apierror.js');
const sc = require('../enums/httpstatuscode.js');
class Service {}

Service.getUser = async (userId, password) => {
	const userFound = await users.getUser(userId, password);
	if(userFound == null){
		throw new APIError(sc.HTTP_UNAUTHORIZED, '잘못된 userId 또는 password 이거나 존재하지않는 사용자입니다');
	}
	return userFound;
}

Object.freeze(Service);
module.exports = Service;
