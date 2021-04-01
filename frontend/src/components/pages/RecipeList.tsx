import React from "react";
import { List, IconButton } from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { RecipeItem } from "../index";

const Recipe = () => {
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
            <List id="recipe-items">
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
            </List>
        </div>
    );
};

export default Recipe;
