import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useUserInfoDispatchContext } from "../Model";
import axios from "axios";

const useStyles = makeStyles({
    input: {
        display: "none"
    }
});
/**
 * 프로필 사진 변경 컴포넌트
 */
const ChangePictureButton = () => {
    const classes = useStyles();
    const setUserInfo = useUserInfoDispatchContext();
    // 사진 변경 이벤트 처리
    const handlePicture = async (e: any) => {
        const imageFile = e.target.files[0];
        if (!imageFile) {
            alert("이미지 파일을 등록해주세요");
            return;
        }
        postImage(imageFile);
    };
    // 프로필 사진 수정 api 요청
    const postImage = async (imageFile: any) => {
        const formData = new FormData();
        formData.append("image", imageFile);
        await axios
            .post("/food-manager/api/user_info", formData)
            .then(async () => {
                setUserInfo((await axios.get("/food-manager/api/user_info")).data);
                alert("프로필 사진이 정상적으로 변경되었습니다.");
            })
            .catch((e) => {
                console.log(e);
                alert(
                    "사진 업로드에 오류가 발생했습니다. ( jpg, png, jpeg, gif 파일만 업로드 가능합니다. )"
                );
            });
    };
    return (
        <form method="POST" action="/user_info" encType="multipart/form-data">
            <input
                accept="image/*"
                className={classes.input}
                id="badge-button-file"
                type="file"
                name="image"
                onChange={handlePicture}
            />
            <label htmlFor="badge-button-file">
                <IconButton aria-label="upload picture" component="span">
                    <AddIcon fontSize="small" />
                </IconButton>
            </label>
        </form>
    );
};

export default ChangePictureButton;
