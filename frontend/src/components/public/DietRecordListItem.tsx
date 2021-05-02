import React from "react";
import { ListItem, ListItemText, IconButton, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface InputProps {
    date: string;
    name: string;
}

const useStyles = makeStyles({
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});

export default function DietRecordListItem({ date, name }: InputProps) {
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemText primary={date} />
            <ListItemText primary={name} />
            <IconButton>
                <Close className={classes.deleteIcon} />
            </IconButton>
        </ListItem>
    );
}
