class RecipeIngredients {}

require('../utils/dbconnector')(RecipeIngredients);

RecipeIngredients.dirty = true;

RecipeIngredients.get = async () => {
    const [row, fields] = await RecipeIngredients.db.execute("SELECT * FROM recipe_ingredients");
    return row;
}

module.exports = RecipeIngredients;
