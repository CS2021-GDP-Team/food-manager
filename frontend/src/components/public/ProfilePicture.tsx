import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { Theme, makeStyles, withStyles, createStyles } from "@material-ui/core/styles";

//TODO : 크기 조절, 스타일링 코드 바깥으로 빼내기, TS로 변경, Badge이벤트처리

const StyledBadge = withStyles({
    badge: {
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)",
        color: "#414141"
    }
})(Badge);

const useStyles = makeStyles({
    root: {
        display: "flex"
    }
});

const ProfilePicture = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                badgeContent={"+"}
            >
                <Avatar alt="Elon" src={process.env.PUBLIC_URL + "/elon.jpg"} />
            </StyledBadge>
        </div>
    );
};

export default ProfilePicture;
