class Recipes {}

require('../utils/dbconnector')(Recipes);

Recipes.getRecipes = async (recipeIds) => {
    recipeIds = recipeIds.join();
    const [row, fields] = await Recipes.db.execute("SELECT * FROM recipes WHERE FIND_IN_SET(id, ?)", [recipeIds]);
    return row;
}

module.exports = Recipes;
