import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { InputField } from "../index";
import { Close, Create } from "@material-ui/icons";
import axios from "axios";
import { useUserInfoDispatchContext } from "../Model";

interface modalProps {
    open: boolean;
    handleClose: () => void;
    userHeight: any;
    userWeight: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        paper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "gray",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        }
    })
);

const UserInfoModal = ({ open, handleClose, userHeight, userWeight }: modalProps) => {
    const classes = useStyles();
    const [_userHeight, setUserHeight] = useState(userHeight);
    const [_userWeight, setUserWeight] = useState(userWeight);
    const setUserInfo = useUserInfoDispatchContext();
    // 신체정보 수정 api 요청
    const handleUserInfo = async () => {
        await axios
            .post("/food-manager/api/user_info", {
                height: _userHeight,
                weight: _userWeight
            })
            .then(async () => {
                setUserInfo((await axios.get("/food-manager/api/user_info")).data);
                handleClose();
            })
            .catch((e) => {
                console.log(e);
                alert("수정하는동안 오류가 발생했습니다.");
            });
    };
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <InputField
                        font_size="1rem"
                        text="Height"
                        type="number"
                        hint="Set Height"
                        setValue={(e: number) => {
                            setUserHeight(e);
                        }}
                        defaultValue={userHeight}
                        fullWidth={true}
                    />
                    <InputField
                        font_size="1rem"
                        text="Weight"
                        type="number"
                        hint="Set Weight"
                        defaultValue={userWeight}
                        fullWidth={true}
                        setValue={(e: number) => {
                            setUserWeight(e);
                        }}
                    />
                    <div>
                        <IconButton onClick={handleUserInfo}>
                            <Create style={{ color: grey[50] }} />
                        </IconButton>
                        <IconButton onClick={handleClose}>
                            <Close style={{ color: grey[50] }} />
                        </IconButton>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default UserInfoModal;
