const u = require('../utils/util.js');
const db = require('../db/db.js');
const router = require('express').Router();
module.exports = router;

router.get('/ping', u.nonLoginWrapper(async(req, res, next) => {
	return u.send(req, res, u.HTTP_OK, 'pong');
}));

router.post('/login', u.nonLoginWrapper(async(req, res, next) => {
	u.validate(req.body, ['userId', 'password']);
	const user = await db.getUser({
		'userId': req.body.userId,
		'password': req.body.password
	});
	if(user == null){
		throw new u.APIError(u.HTTP_BAD_REQUEST, '잘못된 userId, password 이거나 없는 사용자입니다');
	}
	return u.send(req, res, u.HTTP_OK, user);
}));

