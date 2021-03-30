import React from "react";
import ProfilePicture from "../public/ProfilePicture";
import LogoutButton from "../public/LogoutButton";
import InfoList from "../public/InfoList";

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
