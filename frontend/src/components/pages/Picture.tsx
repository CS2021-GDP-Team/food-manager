import React, { useState } from "react";
import { PictureButton, InputField } from "../index";
import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        width: "80%",
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#ffffff",
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)"
    }
});

function getCurrentDate() {
    var time = new Date(),
        month = "" + (time.getMonth() + 1),
        day = "" + time.getDate(),
        year = time.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

const Picture = () => {
    const [ingredient, setIngredient] = useState("");
    const [expDate, setExpDate] = useState(getCurrentDate());
    const [putDate, setPutDate] = useState(getCurrentDate());
    const handleAddIngredient = async () => {
        if (!ingredient) {
            alert("식자재 이름을 입력하세요!");
            return;
        }
        await axios
            .post("/food-manager/api/user_fridge", {
                ingredientName: ingredient,
                expireDate: new Date(expDate).getTime() / 1000,
                putDate: new Date(putDate).getTime() / 1000
            })
            .then((res) => alert("식자재가 등록 되었습니다."))
            .catch((err) => {
                console.log(err);
                alert("식자재 등록에 실패했습니다.");
            });
    };
    const classes = useStyles();
    return (
        <div className="picture-container">
            <div className="picture-button">
                <PictureButton setValue={setIngredient} />
                <h3 className="picture-label">Add a barcode picture !</h3>
            </div>
            <div className="picture-form">
                <InputField
                    font_size="1rem"
                    text="Name"
                    hint="Food Ingredient"
                    setValue={setIngredient}
                />
                <InputField
                    font_size="1rem"
                    text="Exp Date"
                    type="date"
                    hint="Expiration Date"
                    defaultValue={expDate}
                    setValue={setExpDate}
                />
                <InputField
                    font_size="1rem"
                    text="Put Date"
                    type="date"
                    hint="Put Date"
                    defaultValue={putDate}
                    setValue={setPutDate}
                />
            </div>
            <div className="picture-submit">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onClick={handleAddIngredient}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default Picture;
