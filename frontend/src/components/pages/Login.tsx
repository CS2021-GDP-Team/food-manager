import AcUnitIcon from "@material-ui/icons/AcUnit";
import { InputField, SubmitButton } from "../index";

const Login = () => {
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
            </div>
            <div className="login-submit">
                <SubmitButton />
                <div>Forgot ID / PW ?</div>
                <div>Don't have account? REGISTER</div>
            </div>
        </div>
    );
};

export default Login;
