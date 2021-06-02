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
interface recipeProps {
    id: number;
    name: string;
    source: string | null;
    kcal: string | null;
    protein: string | null;
    carbo: string | null;
    fat: string | null;
    salt: string | null;
    url: string;
    ingredients: string;
    likes: number;
}
const Recipe = () => {
    const [defaultList, setDefaultList] = useState<recipeProps[]>([]);
    const [recipeList, setRecipeList] = [useRecipeListContext(), useRecipeListDispatchContext()];
    const history = useHistory();
    const [favorites, setFavorites] = useState<{ [index: number]: number }>({});
    const [isLoad, setIsLoad] = useState(true);
    useEffect(() => {
        const getList = async () => {
            try {
                setIsLoad(true);
                const favoriteList: { [index: number]: number } = {};
                (await axios.get("/food-manager/api/favorite")).data.forEach(
                    ({ recipe_id, score }: favoriteProps) => {
                        favoriteList[recipe_id] = score;
                    }
                );
                setFavorites(favoriteList);
                const data = (await axios.get("/food-manager/api/recommend")).data;
                setDefaultList(data);
                setRecipeList(data);
                setIsLoad(false);
            } catch (e) {
                console.log(e);
                alert("레시피를 가져오는중 오류가 발생했습니다.");
            }
        };
        getList();
    }, []);
    const sortByDefault = () => {
        if (recipeList === defaultList) return;
        console.log([...defaultList]);
        setRecipeList([...defaultList]);
    };

    const sortTotalLikes = () => {
        console.log([...defaultList].sort((a, b) => b.likes - a.likes));
        setRecipeList([...defaultList].sort((a, b) => b.likes - a.likes));
    };

    return (
        <div className="recipe-container">
            <div id="recipe-header">
                <div id="recipe-order">
                    Default
                    <IconButton aria-label="sort" onClick={sortByDefault}>
                        <SwapVert style={{ color: grey[50], fontSize: 30 }} />
                    </IconButton>
                    My Like
                    <IconButton aria-label="sort">
                        <SwapVert style={{ color: grey[50], fontSize: 30 }} />
                    </IconButton>
                    Total Like
                    <IconButton aria-label="sort" onClick={sortTotalLikes}>
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
                    {recipeList.map(
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
                            ingredients,
                            likes
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
                                likes={likes}
                            />
                        )
                    )}
                </List>
            )}
        </div>
    );
};

export default Recipe;
