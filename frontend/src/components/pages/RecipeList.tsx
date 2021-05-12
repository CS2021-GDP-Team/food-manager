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
    const [isLoad, setIsLoad] = useState(true);
    useEffect(() => {
        const getList = async () => {
            try {
                // setIsLoad(true);
                // const favoriteList: { [index: number]: number } = {};
                // (await axios.get("/food-manager/api/favorite")).data.forEach(
                //     ({ recipe_id, score }: favoriteProps) => {
                //         favoriteList[recipe_id] = score;
                //     }
                // );
                // setFavorites(favoriteList);
                // console.log("전", favorites);

                // setRecipeList((await axios.get("/food-manager/api/recommend")).data);
                setIsLoad(false);
            } catch (e) {
                console.log(e);
                alert("레시피를 가져오는중 오류가 발생했습니다.");
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
            {isLoad ? (
                <div id="recipe-progress">
                    <CircularProgress style={{ color: grey[50] }} />
                    <p>Getting recipe information ...</p>
                </div>
            ) : (
                <List id="recipe-items">
                    <RecipeItem
                        id={1}
                        name={"21"}
                        source={"22"}
                        kcal={"22"}
                        protein={"22"}
                        carbo={"22"}
                        fat={"22"}
                        salt={"22"}
                        score={1}
                        url={""}
                        ingredients={"32dwdwewㅇ자"}
                    />
                    {/* {recipeList.map(
                        ({
                            id,
                            name,
                            source,
                            kcal,
                            protein,
                            carbo,
                            fat,
                            salt,
                            url,
                            ingredients
                        }) => (
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
                                ingredients={ingredients}
                            />
                        )
                    )} */}
                </List>
            )}
        </div>
    );
};

export default Recipe;
