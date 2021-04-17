import React, { useState } from "react";
import { PictureButton, InputField } from "../index";
import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";

// TODO : category 대신 현재 시간으로 바꾸기, 식자재명 -> 식자재 ID 변환 API 필요

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
    const [ingredient, setIngredient] = useState("");
    const [date, setDate] = useState(null);
    const [category, setCategory] = useState("");
    const handleAddIngredient = async () => {
        if (!ingredient) {
            alert("식자재 이름을 입력하세요!");
            return;
        }
        await axios
            .post("/food-manager/api/user_fridge", {
                ingredient: ingredient,
                expireDate: date,
                category: category
            })
            .then((res) => alert("식자재가 등록 되었습니다."))
            .catch((err) => alert("식자재 등록에 실패했습니다."));
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
                    setValue={setDate}
                />
                <InputField
                    font_size="1rem"
                    text="Category"
                    hint="Ingredient Category"
                    setValue={setCategory}
                />
            </div>
            <div className="picture-submit">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onChange={handleAddIngredient}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default Picture;
