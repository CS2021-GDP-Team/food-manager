import React from "react";
import ProfilePicture from "../public/ProfilePicture";
import LogoutButton from "../public/LogoutButton";

const Info = () => {
    return (
        <div className="info-container">
            <div className="info-logout">
                <LogoutButton />
            </div>
            <div>
                <ProfilePicture />
            </div>
            <div>여기에 마이페이지 등록</div>
        </div>
    );
};

export default Info;
