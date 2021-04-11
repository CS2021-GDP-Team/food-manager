import React from "react";
import ViewModel from "./ViewModel";
import { MenuListContextProvider, UserIDContextProvider, UserPwContextProvider } from "./Model";
const Provider = () => (
    <UserIDContextProvider>
        <UserPwContextProvider>
            <MenuListContextProvider>
                <ViewModel />
            </MenuListContextProvider>
        </UserPwContextProvider>
    </UserIDContextProvider>
);

export default Provider;
