import React from "react";
import ProfilePicture from "../public/ProfilePicture";
import LogoutButton from "../public/LogoutButton";
import InfoList from "../public/InfoList";

//TODO : 프로필사진 변경 구현, 유저아이디 띄우기 구현, 유저정보 띄우기 구현, 웹푸시 알림 구현
//좋아요 기록 리스트와 식단 기록 리스트 API 연결
//ListItems 생성 모듈화

const Info = () => {
    return (
        <div className="info-container">
            <div className="logout-container">
                <div className="info-logout">
                    <LogoutButton />
                </div>
            </div>
            <div className="info-picture">
                <ProfilePicture />
                <h4 className="info-label">Elon Musk</h4>
            </div>
            <div className="info-profile">
                <InfoList />
            </div>
        </div>
    );
};

export default Info;
