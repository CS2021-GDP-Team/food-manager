import { InputField } from "../index";
import { Link } from "react-router-dom";
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

const SignUp = () => {
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
                <InputField text="ID&nbsp;&nbsp;" hint="Username" />
                <InputField text="PW" type="password" hint="Password" />
                <InputField text="PW" type="password" hint="PW Correction" />
            </div>
            <div className="login-submit">
                <Button variant="contained" color="primary" className={classes.root}>
                    Create
                </Button>
                <div className="login-register">
                    I already have my account&nbsp;
                    <Link to="/login" className="login-link">
                        SIGN IN
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
