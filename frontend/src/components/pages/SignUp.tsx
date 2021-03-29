import AcUnitIcon from "@material-ui/icons/AcUnit";
import { InputField, SubmitButton } from "../index";
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
                {/* TODO: 아이콘 바꿀 예정 */}
                <AcUnitIcon fontSize="large" />
                <b className="login-title">Food Manager</b>
            </div>
            <div className="login-form">
                <InputField text="ID&nbsp;&nbsp;" />
                <InputField text="PW" type="password" />
                <InputField text="PW Correction" type="password" />
            </div>
            <div className="login-submit">
                <Button variant="contained" color="primary" className={classes.root}>
                    Submit
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
