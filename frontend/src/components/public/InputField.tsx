import { Input, InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

interface InputProps {
    text: string;
    hint?: string;
    type?: string;
}

const CssTextField = withStyles({
    root: {
        "&:before": {
            borderBottom: "1px solid white"
        },
        "&:after": {
            borderBottom: "1px solid #00d6af"
        },
        marginBottom: "12px",
        color: "white",
        width: "60%",
        fontSize: "1.3rem",
        "& input": {
            textAlign: "center"
        }
    }
})(Input);

const InputField = ({ text, hint, type }: InputProps) => {
    return (
        <CssTextField
            placeholder={hint}
            startAdornment={
                <InputAdornment position="start">
                    <b>{text}</b>
                </InputAdornment>
            }
            type={type}
        />
    );
};

export default InputField;
