import React from "react";
import { PictureButton, InputField } from "../index";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "80%",
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#ffffff",
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)"
    }
});

const Picture = () => {
    const classes = useStyles();
    return (
        <>
            <div>여기에 바코드 등록</div>
            <PictureButton />
            <div>
                <InputField text="Name" hint="Food Ingredient" />
                <InputField text="Expiration Date" type="date" hint="Expiration Date" />
                <InputField text="Cateogry" hint="Ingredient Category" />
            </div>
            <Button variant="contained" color="primary" className={classes.root}>
                Save
            </Button>
        </>
    );
};

export default Picture;
