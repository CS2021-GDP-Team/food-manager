/**
 * 레시피 DB get 구현
 */

class Recipes {}

require('../utils/dbconnector')(Recipes);

Recipes.getRecipes = async (recipeIds) => {
    recipeIds = recipeIds.join();
    const [row, fields] = await Recipes.db.execute("SELECT * FROM recipes NATURAL JOIN (SELECT * FROM ri_str_view WHERE FIND_IN_SET(id, ?)) ri", [recipeIds]);
    return row;
}

Recipes.updateLikes = async (recipeId, score) => {
    await Recipes.db.execute("UPDATE recipes SET likes=likes+? where id=?", [score, recipeId]);
}

module.exports = Recipes;
