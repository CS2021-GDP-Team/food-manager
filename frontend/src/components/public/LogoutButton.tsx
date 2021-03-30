import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//TODO : 이벤트처리

const useStyles = makeStyles({
    root: {
        color: "#FFFFFF"
    }
});

const LogoutButton = () => {
    const classes = useStyles();

    return (
        <IconButton className={classes.root}>
            <ExitToAppIcon />
        </IconButton>
    );
};

export default LogoutButton;
