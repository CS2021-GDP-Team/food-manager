class Recipes {}

require('../utils/dbconnector')(Recipes);

Recipes.getRecipes = async (recipeIds) => {
    recipeIds = recipeIds.join();
    const [row, fields] = await Recipes.db.execute("SELECT * FROM recipes NATURAL JOIN (SELECT * FROM ri_str_view WHERE FIND_IN_SET(id, ?)) ri", [recipeIds]);
    return row;
}

module.exports = Recipes;
