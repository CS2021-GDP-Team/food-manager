import React from "react";
import { Divider, Avatar, makeStyles, createStyles, Theme } from "@material-ui/core";
import ItemBox from "@material-ui/core/ListItem";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(11),
            height: theme.spacing(11),
            marginLeft: "auto",
            borderRadius: "30px"
        }
    })
);

const ListItem = () => {
    const classes = useStyles();
    return (
        <>
            <ItemBox button>
                <div className="listitem-container">
                    <Avatar
                        variant="square"
                        alt="food"
                        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fruit-salad-horizontal-jpg-1522181219.jpg"
                        className={classes.large}
                    />
                    <div className="listitem-info">
                        <p className="register-date">2021.3.21</p>
                        <p className="listitem-name">유기농 방울 토마토</p>
                        <p className="listitem-type">방울토마토</p>
                        <div className="remain-dates">
                            <b className="expire-date">2021.3.24</b>
                            <b className="remain-date">4일 남음</b>
                        </div>
                    </div>
                </div>
            </ItemBox>
            <Divider style={{ backgroundColor: grey[600] }} />
        </>
    );
};

export default ListItem;
