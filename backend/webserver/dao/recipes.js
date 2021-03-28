class Recipes {}

require('../utils/dbconnector')(Recipes);

Recipes.getRecipes = async (recipeIds) => {
    const [row, fields] = await Recipes.db.execute("SELECT * FROM recipes WHERE id IN ("+recipeIds+")");
    if (row.length === 0) {
        return null;
    }
    return {'result': row};
}

module.exports = Recipes;
