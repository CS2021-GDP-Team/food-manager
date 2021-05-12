import { useEffect } from "react";
import ProfilePicture from "../public/ProfilePicture";
import LogoutButton from "../public/LogoutButton";
import InfoList from "../public/InfoList";
import axios from "axios";
import { useDietRecordDispatchContext, useLikedRecipeDispatchContext } from "../Model";

//TODO : 프로필사진 변경 구현, 유저아이디 띄우기 구현, 유저정보 띄우기 구현, 웹푸시 알림 구현

const Info = () => {
    const setDietRecords = useDietRecordDispatchContext();
    const setLikedRecipe = useLikedRecipeDispatchContext();
    useEffect(() => {
        const getList = async () => {
            try {
                setDietRecords((await axios.get("/food-manager/api/user_diet")).data);
                setLikedRecipe((await axios.get("/food-manager/api/favorite")).data);
            } catch (e) {
                console.log(e);
                alert("유저 정보를 가져오는데 오류가 발생했습니다.");
            }
        };
        getList();
    }, []);

    return (
        <div className="info-container">
            <div className="logout-container">
                <div className="info-logout">
                    <LogoutButton />
                </div>
            </div>
            <div className="info-picture">
                <ProfilePicture />
                <h4 className="info-label">donghoon</h4>
            </div>
            <div className="info-profile">
                <InfoList />
            </div>
        </div>
    );
};

export default Info;
