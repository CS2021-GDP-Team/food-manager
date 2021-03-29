import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//TODO : 크기 조절(아이콘 두께도 조절해야 함), 스타일링코드 바깥으로 빼내기, TS로 변경

const useStyles = makeStyles({
    root: {
        color: "#414141",
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)"
    },
    input: {
        display: "none"
    }
});

const PictureButton = () => {
    const classes = useStyles();

    return (
        <>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span" className={classes.root}>
                    <AddIcon />
                </IconButton>
            </label>
        </>
    );
};

export default PictureButton;
