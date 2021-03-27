import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//TODO : 크기 조절, 스타일링 코드 바깥으로 빼내기, TS로 변경, 이벤트처리

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
