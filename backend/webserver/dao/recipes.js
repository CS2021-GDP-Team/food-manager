class Recipes {}

require('../utils/dbconnector')(Recipes);

Recipes.getRecipes = async (recipeIds) => {
    const [row, fields] = await Recipes.db.execute("SELECT * FROM recipes WHERE FIND_IN_SET(id, ?)", [recipeIds]);

    return {'result': row}; // 검색 결과가 없을 경우 row 는 빈 리스트 []
}

module.exports = Recipes;
