import { Input, InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useState, useRef } from "react";
import { assemble } from "hangul-js";
interface InputProps {
    text: string;
    hint?: string;
    type?: string;
    font_size?: string;
    setValue?: any;
    defaultValue?: any;
    fullWidth?: boolean;
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
const SmallCssTextField = withStyles({
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
        fontSize: "1rem",
        "& input": {
            textAlign: "center"
        }
    }
})(Input);
const FullCssTextField = withStyles({
    root: {
        "&:before": {
            borderBottom: "1px solid white"
        },
        "&:after": {
            borderBottom: "1px solid #00d6af"
        },
        marginBottom: "12px",
        color: "white",
        width: "100%",
        fontSize: "1rem",
        "& input": {
            textAlign: "center"
        }
    }
})(Input);
const InputField = ({
    text,
    hint,
    type,
    font_size,
    setValue,
    defaultValue,
    fullWidth = false
}: InputProps) => {
    const ref = useRef<any>();
    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = assemble(e.target.value.split(""));
        setValue(text);
        ref.current.value = text;
    };
    return (
        <>
            {fullWidth ? (
                <FullCssTextField
                    inputRef={ref}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={hint}
                    startAdornment={
                        <InputAdornment position="start">
                            <b>{text}</b>
                        </InputAdornment>
                    }
                    type={type}
                    defaultValue={defaultValue}
                />
            ) : (
                <>
                    {font_size ? (
                        <SmallCssTextField
                            inputRef={ref}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={hint}
                            startAdornment={
                                <InputAdornment position="start">
                                    <b>{text}</b>
                                </InputAdornment>
                            }
                            type={type}
                            defaultValue={defaultValue}
                        />
                    ) : (
                        <CssTextField
                            inputRef={ref}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={hint}
                            startAdornment={
                                <InputAdornment position="start">
                                    <b>{text}</b>
                                </InputAdornment>
                            }
                            type={type}
                            defaultValue={defaultValue}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default InputField;
