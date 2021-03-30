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
        <div className="picture-container">
            <div className="picture-button">
                <PictureButton />
                <h3 className="picture-label">Add a barcode picture !</h3>
            </div>
            <div className="picture-form">
                <InputField text="Name" hint="Food Ingredient" />
                <InputField text="Exp Date" type="date" hint="Expiration Date" />
                <InputField text="Category" hint="Ingredient Category" />
            </div>
            <div className="picture-submit">
                <Button variant="contained" color="primary" className={classes.root}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default Picture;
