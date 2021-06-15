import React from "react";
import { ListItem, ListItemText, IconButton, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";
import { useLikedRecipeContext, useLikedRecipeDispatchContext } from "../Model";

interface InputProps {
    recipe_id: number;
    id: number;
    user_id: number;
    score: number;
    name: string;
}

const useStyles = makeStyles({
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});
/**
 * 좋아요한 리스트 컴포넌트
 */
export default function LikedListItem({ recipe_id, id, user_id, score, name }: InputProps) {
    const classes = useStyles();
    const [likedRecipe, setLikedRecipe] = [
        useLikedRecipeContext(),
        useLikedRecipeDispatchContext()
    ];
    const handleDelete = async () => {
        try {
            await axios.delete("/food-manager/api/favorite", {
                data: { recipeId: recipe_id }
            });
            setLikedRecipe(likedRecipe.filter((recipe) => recipe.id !== id));
        } catch (e) {
            console.log(e);
            alert("삭제하는동안 오류가 발생했습니다.");
        }
    };

    return (
        <ListItem>
            <ListItemText primary={name} />
            <IconButton onClick={handleDelete}>
                <Close className={classes.deleteIcon} />
            </IconButton>
        </ListItem>
    );
}
