const fctl = require('../frontcontroller/frontcontroller.js');
const util = require('../utils/util.js');
const service = require('../service/service.js');
const hsc = require('../enums/httpstatuscode.js');

const router = require('express').Router();

router.post('/login', fctl.nonLoginWrapper(async(req, res, next) => {
	util.validate(req.body, ['userId', 'password']);
	req.session.user = await service.getUser(req.body.userId, req.body.password);
	//TODO home으로 redirect
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.post('/logout', fctl.loginRequiredWrapper(async(req, res, next) => {
	req.session.destroy();
	//TODO login page로 redirect
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

module.exports = router;
