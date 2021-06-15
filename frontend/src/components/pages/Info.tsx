import { memo, useEffect } from "react";
import ProfilePicture from "../public/ProfilePicture";
import LogoutButton from "../public/LogoutButton";
import InfoList from "../public/InfoList";
import axios from "axios";
import {
    useDietRecordDispatchContext,
    useLikedRecipeDispatchContext,
    useUserInfoContext,
    useUserInfoDispatchContext
} from "../Model";
/*
사용자 정보 페이지
*/

const Info = () => {
    const setDietRecords = useDietRecordDispatchContext();
    const setLikedRecipe = useLikedRecipeDispatchContext();
    const [userInfo, setUserInfo] = [useUserInfoContext(), useUserInfoDispatchContext()];

    useEffect(() => {
        const getList = async () => {
            try {
                setDietRecords((await axios.get("/food-manager/api/user_diet")).data);
                setLikedRecipe((await axios.get("/food-manager/api/favorite")).data);
                setUserInfo((await axios.get("/food-manager/api/user_info")).data);
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
                {userInfo.map((value) => (
                    <h4 className="info-label">{value.user_id}</h4>
                ))}
            </div>
            <div className="info-profile">
                <InfoList />
            </div>
        </div>
    );
};

export default memo(Info);
