import AcUnitIcon from "@material-ui/icons/AcUnit";
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

const Login = () => {
    const classes = useStyles();
    return (
        <div className="login-container">
            <div className="login-head">
                {/* TODO: 아이콘 바꿀 예정 */}
                <AcUnitIcon fontSize="large" />
                <b className="login-title">Food Manager</b>
            </div>
            <div className="login-form">
                <InputField text="ID&nbsp;&nbsp;" hint="Username" />
                <InputField text="PW" type="password" hint="Password" />
            </div>
            <div className="login-submit">
                <Button variant="contained" color="primary" className={classes.root}>
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

export default Login;
