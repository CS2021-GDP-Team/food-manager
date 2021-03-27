import React from "react";
import SubmitButton from "../SubmitButton";
import PictureButton from "../PictureButton";
import Grid from "@material-ui/core/Grid";

const Picture = () => {
    return (
        <Grid item spacing={1} direction="column" alignContent="center" alignItems="center">
            <div>여기에 바코드 등록</div>
            <PictureButton />
            <SubmitButton />
        </Grid>
    );
};

export default Picture;
