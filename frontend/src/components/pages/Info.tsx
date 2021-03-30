import React from "react";
import ProfilePicture from "../public/ProfilePicture";
import LogoutButton from "../public/LogoutButton";

const Info = () => {
    return (
        <>
            <LogoutButton />
            <div>여기에 마이페이지 등록</div>
            <ProfilePicture />
        </>
    );
};

export default Info;
