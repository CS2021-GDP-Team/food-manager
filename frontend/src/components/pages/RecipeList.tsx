import { useHistory } from "react-router-dom";
import { List, IconButton, CircularProgress } from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { useEffect } from "react";
import { grey } from "@material-ui/core/colors";
import { RecipeItem } from "../index";
import { useRecipeListContext, useRecipeListDispatchContext, useMenuListContext } from "../Model";
import axios from "axios";

const Recipe = () => {
    const recipeList = useRecipeListContext();
    const setRecipeList = useRecipeListDispatchContext();
    const ingredientIds: number[] = useMenuListContext().map(({ ingredient_id }) => ingredient_id);
    const history = useHistory();
    useEffect(() => {
        const getList = async () => {
            try {
                console.log("ingIds", ingredientIds);

                setRecipeList(
                    (await axios.post("/food-manager/api/recommend", { ingredientIds })).data
                );
                console.log("recipe_list", recipeList);
            } catch (e) {
                console.log(e);
                alert("레시피를 가져오는중 오류가 발생했습니다.");
                history.push("/login");
            }
        };
        getList();
    }, []);
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
                        />
                    ))}
                </List>
            )}
        </div>
    );
};

export default Recipe;
