import React from "react";
import { ListItem, ListItemText, IconButton, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface InputProps {
    recipe_name: string;
}

const useStyles = makeStyles({
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});

export default function LikedListItem({ recipe_name }: InputProps) {
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemText primary={recipe_name} />
            <IconButton>
                <Close className={classes.deleteIcon} />
            </IconButton>
        </ListItem>
    );
}
