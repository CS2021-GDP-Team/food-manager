const fctl = require('../frontcontroller/frontcontroller.js');
const util = require('../utils/util.js');
const service = require('../service/service.js');
const hsc = require('../enums/httpstatuscode.js');

const router = require('express').Router();

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

router.post('picture', fctl.loginRequiredWrapper(async (req, res, next) => {
	const text = await service.readPicture(res.body)
    return fctl.send(req, res, hsc.HTTP_OK, {'text': text});
}));

router.post('/recommend', fctl.nonLoginWrapper(async (req, res, next) => {
    const data = await service.recommendRecipes(req.body.userIngredients);
    return fctl.send(req, res, hsc.HTTP_OK, data);
}));

router.get('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
	const ingredients = await service.getUserIngredients(req.session.user.id);
	return fctl.send(req, res, hsc.HTTP_OK, ingredients);
}));

router.post('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['ingredientId']);
	const ingredientId = req.body.ingredientId;
	const putDate = util.isEmpty(req.body.putDate) ? null : req.body.putDate;
	const expireDate = util.isEmpty(req.body.expireDate) ? null : req.body.expireDate;
	await service.insertUserIngredient(req.session.user.id, ingredientId, putDate, expireDate);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.put('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['ingredientId']);
	const ingredientId = req.body.ingredientId;
	const putDate = util.isEmpty(req.body.putDate) ? null : req.body.putDate;
	const expireDate = util.isEmpty(req.body.expireDate) ? null : req.body.expireDate;
	await service.updateUserIngredient(req.session.user.id, ingredientId, putDate, expireDate);
	return fctl.send(req, res, hsc.HTTP_OK, null);
}));

router.delete('/user_fridge', fctl.loginRequiredWrapper(async (req, res, next) => {
    util.validate(req.body, ['ingredientId']);
	const ingredientId = req.body.ingredientId;
	await service.deleteUserIngredient(req.session.user.id, ingredientId);
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

module.exports = router;
