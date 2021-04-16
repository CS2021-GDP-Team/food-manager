import React, { useState } from "react";
import { Divider, Avatar, makeStyles, createStyles, Theme } from "@material-ui/core";
import ItemBox from "@material-ui/core/ListItem";
import { grey } from "@material-ui/core/colors";
import { Modal } from "../index";

interface itemProps {
    id: number;
    user_id: number;
    ingredient_id: number;
    put_date: string;
    expire_date: string;
}

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

const ListItem = ({ id, user_id, ingredient_id, put_date, expire_date }: itemProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ItemBox button onClick={() => setOpen(true)}>
                <div className="listitem-container">
                    <Avatar
                        variant="square"
                        alt="food"
                        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fruit-salad-horizontal-jpg-1522181219.jpg"
                        className={classes.large}
                    />
                    <div className="listitem-info">
                        <p className="register-date">{put_date.slice(0, 10)}</p>
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
            <Modal open={open} handleClose={handleClose} />
        </>
    );
};

export default ListItem;
