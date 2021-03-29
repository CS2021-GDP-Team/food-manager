import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//TODO : height 조절, 버튼 내부 텍스트 동적 할당, 스타일링코드 바깥으로 빼내기, TS로 변경

const useStyles = makeStyles({
    root: {
        width: "88%",
        color: "#ffffff",
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)"
    }
});

const SubmitButton = () => {
    const classes = useStyles();

    return (
        <Button variant="contained" color="primary" className={classes.root}>
            Submit
        </Button>
    );
};

export default SubmitButton;
