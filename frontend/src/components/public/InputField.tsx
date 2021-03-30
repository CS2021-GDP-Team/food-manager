import { Input, InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

interface InputProps {
    text: string;
    hint?: string;
    type?: string;
    font_size?: string;
}

const InputField = ({ text, hint, type, font_size = "1.3rem" }: InputProps) => {
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
            fontSize: font_size,
            "& input": {
                textAlign: "center"
            }
        }
    })(Input);

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
