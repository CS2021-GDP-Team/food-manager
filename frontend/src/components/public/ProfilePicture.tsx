import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

//TODO : Badge이벤트처리
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

    return (
        <div>
            <StyledBadge
                className={classes.root}
                overlap="circle"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                badgeContent={"+"}
            >
                <Avatar
                    alt="Elon"
                    className={classes.avatar}
                    src={process.env.PUBLIC_URL + "/images/elon.jpg"}
                />
            </StyledBadge>
        </div>
    );
};

export default ProfilePicture;
