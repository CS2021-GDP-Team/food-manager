import React, { useState } from "react";
import { Divider, Avatar, makeStyles, createStyles, Theme, IconButton } from "@material-ui/core";
import ItemBox from "@material-ui/core/ListItem";
import { grey } from "@material-ui/core/colors";
import {
    ThumbUpAltOutlined,
    ThumbUp,
    ThumbDown,
    ThumbDownAltOutlined,
    PlaylistAdd
} from "@material-ui/icons";
import axios from "axios";

interface recipeProps {
    id: number;
    name: string;
    source: string | null;
    kcal: string | null;
    protein: string | null;
    carbo: string | null;
    fat: string | null;
    salt: string | null;
    score?: number;
    url: string;
    ingredients: string;
    likes: number;
    sorted: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            marginLeft: "auto",
            borderRadius: "40px",
            cursor: "pointer"
        }
    })
);

const RecipeItem = ({
    id,
    name,
    source,
    kcal,
    protein,
    carbo,
    fat,
    salt,
    score = 0,
    url,
    ingredients,
    likes,
    sorted
}: recipeProps) => {
    const classes = useStyles();
    const [like, setLike] = useState<number>(score);
    const handleLike = async (type: boolean) => {
        // true = click like, false= click unlike
        if (type) {
            like === 1 ? (score = 0) : (score = 1);
        } else {
            like === -1 ? (score = 0) : (score = -1);
        }
        try {
            await axios.post("/food-manager/api/favorite", { recipeId: id, score });
            setLike(score);
        } catch (e) {
            console.log(e);
            alert("잠시후 다시 시도해주시기 바랍니다.");
        }
    };
    const handleDiet = async () => {
        try {
            await axios.post("/food-manager/api/user_diet", { recipeId: id });
            alert("식단을 성공적으로 추가했습니다.");
        } catch (e) {
            console.log(e);
            alert("식단 추가에 오류가 발생했습니다.");
        }
    };
    const handleLink = () => {
        window.open(`https://www.youtube.com/results?search_query=${name}`, "_blank");
    };
    return (
        <>
            <ItemBox>
                <div className="listitem-container">
                    <Avatar
                        variant="square"
                        alt="food"
                        src={url}
                        className={classes.large}
                        onClick={handleLink}
                    />
                    <div className="recipeitem-info">
                        <p className="recipe-title" onClick={handleLink}>
                            {name}
                        </p>
                        <p className="recipe-ingredients" onClick={handleLink}>
                            {ingredients}
                        </p>
                        <div style={{ marginLeft: "auto" }}>
                            <IconButton title="add diet" onClick={handleDiet}>
                                <PlaylistAdd style={{ color: grey[50], fontSize: "2rem" }} />
                            </IconButton>
                            {sorted ? (
                                `${likes}likes`
                            ) : (
                                <>
                                    <IconButton title="like" onClick={() => handleLike(true)}>
                                        {like === 1 ? (
                                            <ThumbUp
                                                style={{ color: grey[50], fontSize: "2rem" }}
                                            />
                                        ) : (
                                            <ThumbUpAltOutlined
                                                style={{ color: grey[50], fontSize: "2rem" }}
                                            />
                                        )}
                                    </IconButton>
                                    <IconButton title="unlike" onClick={() => handleLike(false)}>
                                        {like === -1 ? (
                                            <ThumbDown
                                                style={{ color: grey[50], fontSize: "2rem" }}
                                            />
                                        ) : (
                                            <ThumbDownAltOutlined
                                                style={{ color: grey[50], fontSize: "2rem" }}
                                            />
                                        )}
                                    </IconButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </ItemBox>
            <Divider style={{ backgroundColor: grey[600] }} />
        </>
    );
};

export default RecipeItem;
