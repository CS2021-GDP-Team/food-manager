const APIError = require('../exceptions/apierror.js');
const sc = require('../enums/httpstatuscode.js');
const util = require('../utils/util.js');

class FrontController {}

_errorHandle = (req, res, error) => {
	if(error instanceof APIError) {
		return FrontController.send(req, res, error.status, {"message":error.message});
	}
	return FrontController.send(req, res, sc.HTTP_INTERNAL_SERVER_ERROR, {"message":error});
}

_addTimes = (req) => {
	if(!util.isEmpty(req.session.user)) {
		if(!req.session.times) req.session.times = 0;
		req.session.times++;
	}
}

_logInTraffic = (req) => {
	try {
		console.log();
		if(req.session && !util.isEmpty(req.session.user)){
			console.log(`from ${req.headers['x-real-ip']} (${req.session.user.userId}, ${req.session.times ? req.session.times : 0}th api call) ${req.method} ${req.originalUrl}`);
		} else {
			console.log(`from ${req.headers['x-real-ip']} ${req.method} ${req.originalUrl}`);
		}
	} catch(e) {
		console.log(`Error occurred while logging: `+e);
	}
}

_logOutTraffic = (req, res, status, body) => {
	try {
		console.log(`server response status : ${status}`);
		console.log(body ? body : '<Empty body>');
	} catch(e) {
		console.log(`Error occurred while logging: `+e);
	}
}

//async nonLoginWrapper setting. It enables async routers without user logined.
FrontController.nonLoginWrapper = asyncFn => {
	return (async (req, res, next) => {
		_logInTraffic(req);
		try {
			_addTimes(req);
			return await asyncFn(req, res, next);
		} catch (error) {
			return _errorHandle(req, res, error);
		}
	});
};

//async loginRequiredWrapper setting. It enables async routers with user logined
FrontController.loginRequiredWrapper = asyncFn => {
	return (async (req, res, next) => {
		_logInTraffic(req);
		try {
			if(util.isEmpty(req.session.user)) {
				throw new APIError(sc.HTTP_UNAUTHORIZED, "세션이 발급되지 않았습니다");
			} 
			_addTimes(req);
			return await asyncFn(req, res, next);
		} catch (error) {
			return _errorHandle(req, res, error);
		}
	});
};

FrontController.send = async (req, res, status, body)=>{
	_logOutTraffic(req, res, status, body);
	return res.status(status).send(body);
};

Object.freeze(FrontController);
module.exports = FrontController;
