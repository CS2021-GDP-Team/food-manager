import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//TODO : 아이콘 두께 조절

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)",
        width: 100,
        height: 100,
        padding: 0
    },
    input: {
        display: "none"
    },
    icon: {
        color: "#414141",
        fontSize: 72
    }
});

const PictureButton = () => {
    const classes = useStyles();

    return (
        <>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span" className={classes.root}>
                    <AddIcon className={classes.icon} />
                </IconButton>
            </label>
        </>
    );
};

export default PictureButton;
