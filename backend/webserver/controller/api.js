const fctl = require('../frontcontroller/frontcontroller.js');
const util = require('../utils/util.js');
const service = require('../service/service.js');
const hsc = require('../enums/httpstatuscode.js');

const router = require('express').Router();

router.post('/user', fctl.nonLoginWrapper(async (req, res, next) => {
    util.validate(req.body, ['userId', 'password']);
    await service.createUser(req.body.userId, req.body.password);
    return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.delete('/user', fctl.loginRequiredWrapper(async (req, res, next) => {
	await service.deleteUser(req.session.user.id);
    req.session.destroy();
    return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.post('/login', fctl.nonLoginWrapper(async (req, res, next) => {
    util.validate(req.body, ['userId', 'password']);
    req.session.user = await service.getUser(req.body.userId, req.body.password);
    //TODO home으로 redirect
    return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.post('/logout', fctl.loginRequiredWrapper(async (req, res, next) => {
    req.session.destroy();
    //TODO login page로 redirect
    return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.post('/picture', fctl.loginRequiredWrapper(async (req, res, next) => {
	const text = await service.readPicture(res.body)
    return fctl.send(req, res, hsc.HTTP_OK, {'text': text});
}));

router.post('/barcode', fctl.loginRequiredWrapper(async (req, res, next) => {
	const sampleData = {
		8801007100838: {
		   name: '[백설] 하얀설탕 (1kg)',
		   hours: '3600',
		   url: 'http://image.auction.co.kr/itemimage/1b/e6/d7/1be6d79246.jpg',
		},
		8801069173603: {
		   name: '[남양] 맛있는 우유 GT 900ml',
		   hours: '240',
		   url: 'http://img.danawa.com/prod_img/500000/305/837/img/3837305_1.jpg?shrink=360:360&_v=20171117134546',
		},
	}
	util.validate(req.body, ['barcode_number']);
	const barcode_number = req.body.barcode_number;
	if(!sampleData[barcode_number]){
		return fctl.send(req,res, hsc.HTTP_BAD_REQUEST);
	}
	return fctl.send(req, res, hsc.HTTP_OK, sampleData[barcode_number]);
}));

router.get('/recommend', fctl.loginRequiredWrapper(async (req, res, next) => {
	const start = util.isEmpty(req.query.start) ? null : parseInt(req.query.start);
	const end = util.isEmpty(req.query.end) ? null : parseInt(req.query.end);
    const data = await service.recommendRecipes(req.session.user.id, start, end);
    return fctl.send(req, res, hsc.HTTP_OK, data);
}));

router.get('/recommend2', fctl.loginRequiredWrapper(async (req, res, next) => {
	const start = util.isEmpty(req.query.start) ? null : parseInt(req.query.start);
	const end = util.isEmpty(req.query.end) ? null : parseInt(req.query.end);
    const data = await service.recommendRecipes2(req.session.user.id, start, end);
    return fctl.send(req, res, hsc.HTTP_OK, data);
}));

router.post('/recipe', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['recipeIds']);
    const data = await service.getRecipes(req.body.recipeIds);
    return fctl.send(req, res, hsc.HTTP_OK, data);
}));

router.get('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
	const ingredients = await service.getUserIngredients(req.session.user.id);
	return fctl.send(req, res, hsc.HTTP_OK, ingredients);
}));

router.post('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['ingredientName']);
	const ingredientName = req.body.ingredientName;
	const putDate = util.isEmpty(req.body.putDate) ? null : req.body.putDate;
	const expireDate = util.isEmpty(req.body.expireDate) ? null : req.body.expireDate;
	await service.insertUserIngredient(req.session.user.id, ingredientName, putDate, expireDate);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.put('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['id']);
	const id = req.body.id;
	const putDate = util.isEmpty(req.body.putDate) ? null : req.body.putDate;
	const expireDate = util.isEmpty(req.body.expireDate) ? null : req.body.expireDate;
	await service.updateUserIngredient(id, putDate, expireDate);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.delete('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['id']);
	const id = req.body.id;
	await service.deleteUserIngredient(id);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.get('/user_diet', fctl.loginRequiredWrapper(async (req, res, next) => {
	const recipes = await service.getUserRecipes(req.session.user.id);
	return fctl.send(req, res, hsc.HTTP_OK, recipes);
}));

router.post('/user_diet', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['recipeId']);
	const recipeId = req.body.recipeId;
	const putDate = util.isEmpty(req.body.putDate) ? null : req.body.putDate;
	await service.insertUserRecipe(req.session.user.id, recipeId, putDate);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.put('/user_diet', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['dietId', 'putDate']);
	const dietId = req.body.dietId;
	const putDate = req.body.putDate;
	await service.updateUserRecipe(req.session.user.id, dietId, putDate);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.delete('/user_diet', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['dietId']);
	const dietId = req.body.dietId;
	await service.deleteUserRecipe(req.session.user.id, dietId);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.get('/favorite', fctl.loginRequiredWrapper(async (req, res, next) => {
	const favorites = await service.getFavorites(req.session.user.id);
	return fctl.send(req, res, hsc.HTTP_OK, favorites);
}));

router.post('/favorite', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['recipeId', 'score']);
	const recipeId = req.body.recipeId;
	const score = req.body.score;
	await service.insertFavorite(req.session.user.id, recipeId, score);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.delete('/favorite', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['recipeId']);
	const recipeId = req.body.recipeId;
	await service.deleteFavorite(req.session.user.id, recipeId);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

module.exports = router;
