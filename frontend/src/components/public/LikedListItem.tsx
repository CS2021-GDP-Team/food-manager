import React from "react";
import { ListItem, ListItemText, IconButton, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface InputProps {
    name: string;
}

const useStyles = makeStyles({
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});

export default function LikedListItem({ name }: InputProps) {
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemText primary={name} />
            <IconButton>
                <Close className={classes.deleteIcon} />
            </IconButton>
        </ListItem>
    );
}
