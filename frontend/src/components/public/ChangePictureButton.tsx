import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

export default function ChangePictureButton() {
    return (
        <div>
            <IconButton
                aria-label="changePicture"
                onClick={() => {
                    alert("뱃지 클릭 됨");
                }}
            >
                <AddIcon fontSize="small" />
            </IconButton>
        </div>
    );
}
