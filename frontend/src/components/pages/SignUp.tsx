import AcUnitIcon from "@material-ui/icons/AcUnit";
import { InputField } from "../index";
import SubmitButton from "../SubmitButton";

const SignUp = () => {
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
                <SubmitButton />
                <div>I already have my account SIGN IN</div>
            </div>
        </div>
    );
};

export default SignUp;
