import React, { memo, useEffect } from "react";
import { Badge, Avatar, Box } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useUserInfoContext, useUserInfoDispatchContext } from "../Model";
import ChangePictureButton from "./ChangePictureButton";
import axios from "axios";

const StyledBadge = withStyles({
    badge: {
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)",
        color: "#414141",
        height: 32,
        width: 32,
        borderRadius: 100,
        fontSize: 24,
        fontWeight: "bold"
    }
})(Badge);

const useStyles = makeStyles({
    root: {
        display: "flex"
    },
    avatar: {
        width: "8rem",
        height: "8rem"
    }
});

const ProfilePicture = () => {
    const classes = useStyles();
    const [userInfo, setUserInfo] = [useUserInfoContext(), useUserInfoDispatchContext()];

    return (
        <div>
            {userInfo.map((value) => (
                <StyledBadge
                    className={classes.root}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    badgeContent={<ChangePictureButton />}
                >
                    <Avatar
                        alt={value.user_id}
                        className={classes.avatar}
                        src={`https://food-manager.ga/food-manager/static/${value.filepath}`}
                    />
                </StyledBadge>
            ))}
        </div>
    );
};

export default memo(ProfilePicture);
