const db = require('../db/db.js');
class Util{};

class APIError extends Error{
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}
}

_errorHandle = (req, res, error) => {
	if(error instanceof APIError) {
		return Util.send(req, res, error.status, {"message":error.message});
	}
	return Util.send(req, res, Util.HTTP_INTERNAL_SERVER_ERROR, {"message":error});
}

Util.JSESSION = 'JSESSION';
Util.HTTP_OK = 200;
Util.HTTP_BAD_REQUEST = 400;
Util.HTTP_UNAUTHORIZED = 401;
Util.HTTP_INTERNAL_SERVER_ERROR = 500;
Util.HTTP_NOT_IMPLEMENTED = 501;


Util.APIError = APIError;

//async nonLoginWrapper setting. It enables async routers without user logined.
Util.nonLoginWrapper = asyncFn => {
	return (async (req, res, next) => {
		try {
			return await asyncFn(req, res, next);
		} catch (error) {
			return _errorHandle(req, res, error);
		}
	});
};

//async loginRequiredWrapper setting. It enables async routers with user logined
Util.loginRequiredWrapper = asyncFn => {
	return (async (req, res, next) => {
		try {
			if(Util.isEmpty(req.cookies[Util.JSESSION])) {
				throw new APIError(Util.HTTP_BAD_REQUEST, "세션 JSESSION이 필요합니다");
			} 
			const userId = await db.getUserIdFromSession(req.cookies[Util.JSESSION]);
			if(userId == null){
				res.clearCookie(Util.JSESSION);
				throw new APIError(Util.HTTP_UNAUTHORIZED, "유효하지 않은 세션입니다");
			}
			return await asyncFn(userId, req, res, next);
		} catch (error) {
			return _errorHandle(req, res, error);
		}
	});
};

Util.send = async (req, res, status, body)=>{
	try{
		console.log();
		console.log(`from ${req.headers['x-real-ip']} ${req.method} ${req.originalUrl}`);
		console.log(`server response status : ${status}`);
		console.log(body);
	} catch(err){
		console.log('A Fatal Error Occured : '+err);
	} finally{
		return res.status(status).send(body);
	}
};

Util.validate = (object, items)=>{
	for(var i=0; i<items.length; i++){
		if(Util.isEmpty(object[items[i]])){
			throw new APIError(Util.HTTP_BAD_REQUEST, `${items[i]} 가 필요합니다`);
		}
	}
};

Util.isEmpty = (item)=>{
	return typeof(item) == 'undefined' || item == null || item == '';
};

Object.freeze(Util);

module.exports = Util;
