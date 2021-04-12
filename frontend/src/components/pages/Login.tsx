import { InputField } from "../index";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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

const Login = () => {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const handleLogin = async () => {
        if (!userId || !userPw) {
            alert("로그인 정보를 입력해 주세요.");
            return;
        }
        try {
            const result = await axios.post("https://jeto.ga/food-manager/api/user", {
                id: userId,
                password: userPw
            });
            console.log(result);
        } catch {
            alert("접속 오류가 발생했습니다. 잠시 후 다시 시도해 주세요");
        }
    };
    const classes = useStyles();
    return (
        <div className="login-container">
            <div className="login-head">
                <img
                    className="login-icon"
                    alt="logo"
                    src={process.env.PUBLIC_URL + "images/icon.png"}
                ></img>
                <b className="login-title">Food Manager</b>
            </div>
            <div className="login-form">
                <InputField text="ID&nbsp;&nbsp;" hint="Username" setValue={setUserId} />
                <InputField text="PW" type="password" hint="Password" setValue={setUserPw} />
            </div>
            <div className="login-submit">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                {/* <div>Forgot ID / PW ?</div> */}
                <div className="login-register">
                    Don't have account?&nbsp;
                    <Link to="/signup" className="login-link">
                        REGISTER
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Login);
