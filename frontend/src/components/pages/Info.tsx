import React from "react";
import Grid from "@material-ui/core/Grid";
import ProfilePicture from "../ProfilePicture";
import LogoutButton from "../LogoutButton";

const Info = () => {
    return (
        <Grid item spacing={1} direction="column" alignContent="center" alignItems="center">
            <div>여기에 마이페이지 등록</div>
            <ProfilePicture />
            <LogoutButton />
        </Grid>
    );
};

export default Info;
