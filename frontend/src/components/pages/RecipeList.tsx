import { useHistory } from "react-router-dom";
import { List, IconButton, CircularProgress } from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { useEffect } from "react";
import { grey } from "@material-ui/core/colors";
import { RecipeItem } from "../index";
import { useRecipeListContext, useRecipeListDispatchContext, useMenuListContext } from "../Model";
import axios from "axios";
interface favoriteProps {
    recipe_id: number;
    score: number;
}
const Recipe = () => {
    const [recipeList, setRecipeList] = [useRecipeListContext(), useRecipeListDispatchContext()];
    const menuList = useMenuListContext();
    const history = useHistory();
    const favoriteList: { [index: number]: number } = {};
    useEffect(() => {
        const getList = async () => {
            try {
                const ingredientIds: number[] = menuList.map(({ ingredient_id }) => ingredient_id);
                (await axios.get("/food-manager/api/favorite")).data.map(
                    ({ recipe_id, score }: favoriteProps) => {
                        favoriteList[recipe_id] = score;
                    }
                );
                console.log("전", favoriteList);

                setRecipeList(
                    (await axios.post("/food-manager/api/recommend", { ingredientIds })).data
                );
            } catch (e) {
                console.log(e);
                alert("레시피를 가져오는중 오류가 발생했습니다.");
                history.push("/login");
            }
        };
        getList();
    }, []);
    console.log("후", favoriteList);
    return (
        <div className="recipe-container">
            <div id="recipe-header">
                <div id="recipe-order">
                    Default
                    <IconButton aria-label="sort">
                        <SwapVert style={{ color: grey[50], fontSize: 30 }} />
                    </IconButton>
                    Cooking Time
                    <IconButton aria-label="sort">
                        <SwapVert style={{ color: grey[50], fontSize: 30 }} />
                    </IconButton>
                    Like
                    <IconButton aria-label="sort">
                        <SwapVert style={{ color: grey[50], fontSize: 30 }} />
                    </IconButton>
                </div>
            </div>
            {recipeList.length === 0 ? (
                <CircularProgress style={{ margin: "0 auto" }} />
            ) : (
                <List id="recipe-items">
                    {recipeList.map(({ id, name, source, kcal, protein, carbo, fat, salt }) => (
                        <RecipeItem
                            id={id}
                            name={name}
                            source={source}
                            kcal={kcal}
                            protein={protein}
                            carbo={carbo}
                            fat={fat}
                            salt={salt}
                            score={favoriteList[id] ? favoriteList[id] : 0}
                        />
                    ))}
                </List>
            )}
        </div>
    );
};

export default Recipe;
