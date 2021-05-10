import { useHistory } from "react-router-dom";
import { List, IconButton, CircularProgress } from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { grey } from "@material-ui/core/colors";
import { RecipeItem } from "../index";
import { useRecipeListContext, useRecipeListDispatchContext } from "../Model";
import axios from "axios";
interface favoriteProps {
    recipe_id: number;
    score: number;
}
const Recipe = () => {
    const [recipeList, setRecipeList] = [useRecipeListContext(), useRecipeListDispatchContext()];
    const history = useHistory();
    const [favorites, setFavorites] = useState<{ [index: number]: number }>({});
    useEffect(() => {
        const getList = async () => {
            try {
                const favoriteList: { [index: number]: number } = {};
                (await axios.get("/food-manager/api/favorite")).data.forEach(
                    ({ recipe_id, score }: favoriteProps) => {
                        favoriteList[recipe_id] = score;
                    }
                );
                setFavorites(favoriteList);
                console.log("전", favorites);

                setRecipeList((await axios.get("/food-manager/api/recommend")).data);
            } catch (e) {
                console.log(e);
                alert("레시피를 가져오는중 오류가 발생했습니다.");
                history.push("/login");
            }
        };
        getList();
    }, []);
    console.log("후", favorites);
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
                <div id="recipe-progress">
                    <CircularProgress style={{ color: grey[50] }} />
                    <p>Getting recipe information ...</p>
                </div>
            ) : (
                <List id="recipe-items">
                    {recipeList.map(
                        ({ id, name, source, kcal, protein, carbo, fat, salt, url }) => (
                            <RecipeItem
                                id={id}
                                name={name}
                                source={source}
                                kcal={kcal}
                                protein={protein}
                                carbo={carbo}
                                fat={fat}
                                salt={salt}
                                score={favorites[id]}
                                url={url}
                            />
                        )
                    )}
                </List>
            )}
        </div>
    );
};

export default Recipe;
