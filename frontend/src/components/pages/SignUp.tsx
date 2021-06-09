import { useState } from "react";
import { InputField } from "../index";
import { Link, useHistory } from "react-router-dom";
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

const SignUp = () => {
    const history = useHistory();
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [corrPw, setCorrPw] = useState("");
    const handleSignUp = async () => {
        if (!userId || !userPw || !corrPw) {
            alert("회원가입 정보를 입력해 주세요.");
            return;
        }
        if (userPw !== corrPw) {
            alert("입력하신 비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const result = await axios.post("/food-manager/api/user", {
                userId: userId,
                password: userPw
            });
            console.log(result);
            history.push("/login");
            alert("회원가입을 축하드립니다. 다시 로그인 해주시기 바랍니다.");
        } catch (e) {
            console.log(e);
            alert("일시적 오류가 발생했습니다. 잠시 후 다시 시도해 주세요");
        }
    };
    const classes = useStyles();
    return (
        <div className="login-container">
            <div className="login-head">
                <img
                    className="login-icon"
                    alt="logo"
                    src={process.env.PUBLIC_URL + "/images/icon.png"}
                ></img>
                <b className="login-title">Food Manager</b>
            </div>
            <div className="login-form">
                <InputField text="ID&nbsp;&nbsp;" hint="Username" setValue={setUserId} />
                <InputField text="PW" type="password" hint="Password" setValue={setUserPw} />
                <InputField text="PW" type="password" hint="PW Correction" setValue={setCorrPw} />
            </div>
            <div className="login-submit">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onClick={handleSignUp}
                >
                    Create
                </Button>
                <div className="login-register">
                    I already have my account
                    <br />
                    <Link to="/login" className="login-link">
                        SIGN IN
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
