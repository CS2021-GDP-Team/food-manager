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
    kcal: string | null;
    image_url: string;
    ingredients: string;
    likes: number;
    source_url: string;
}
const Recipe = () => {
    const [defaultList, setDefaultList] = useState<recipeProps[]>([]);
    const [recipeList, setRecipeList] = [useRecipeListContext(), useRecipeListDispatchContext()];
    const [favorites, setFavorites] = useState<{ [index: number]: number }>({});
    const [totalFavorites, setTotalFavorites] = useState<(favoriteProps & recipeProps)[]>([]);
    const [sorted, setSorted] = useState<boolean>(false);
    const [isLoad, setIsLoad] = useState(true);
    useEffect(() => {
        const getList = async () => {
            try {
                setIsLoad(true);
                const favoriteList: { [index: number]: number } = {};
                const favorites: (favoriteProps & recipeProps)[] = (
                    await axios.get("/food-manager/api/favorite")
                ).data;
                favorites.forEach(({ recipe_id, score }) => {
                    favoriteList[recipe_id] = score;
                });
                setTotalFavorites(favorites);
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
        setRecipeList([...defaultList]);
        setSorted(false);
    };

    const showMyLike = () => {
        setRecipeList(totalFavorites.filter((item) => item.likes > 0));
        setSorted(true);
    };
    const sortTotalLikes = () => {
        setRecipeList([...defaultList].sort((a, b) => b.likes - a.likes));
        setSorted(true);
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
                    <IconButton aria-label="sort" onClick={showMyLike}>
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
                        ({ id, name, source_url, kcal, image_url, ingredients, likes }) => (
                            <RecipeItem
                                id={id}
                                name={name}
                                source_url={source_url}
                                kcal={kcal}
                                score={favorites[id]}
                                image_url={image_url}
                                ingredients={ingredients}
                                likes={likes}
                                sorted={sorted}
                            />
                        )
                    )}
                </List>
            )}
        </div>
    );
};

export default Recipe;
