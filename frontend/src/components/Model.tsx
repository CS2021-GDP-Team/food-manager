import React, { useState, createContext, useContext, Dispatch } from "react";

const MenuListContext = createContext<string[] | null>(null);
const MenuListDispatchContext = createContext<Dispatch<string[]> | null>(null);
const UserIdContext = createContext<string>("");
const UserIdDispatchContext = createContext<Dispatch<string>>(String);
const UserPwContext = createContext<string>("");
const UserPwDispatchContext = createContext<Dispatch<string>>(String);
// =========  menuList
export const MenuListContextProvider = ({ children }: any) => {
    const [menuList, setMenuList] = useState(["안녕하세요"]);

    return (
        <MenuListContext.Provider value={menuList}>
            <MenuListDispatchContext.Provider value={setMenuList}>
                {children}
            </MenuListDispatchContext.Provider>
        </MenuListContext.Provider>
    );
};

export const useMenuListContext = () => {
    const context = useContext(MenuListContext);
    return context;
};

export const useMenuListDispatchContext = () => {
    const context = useContext(MenuListDispatchContext);
    return context;
};
// =========  menuList
// =========  ID
export const UserIDContextProvider = ({ children }: any) => {
    const [userId, setUserId] = useState("");

    return (
        <UserIdContext.Provider value={userId}>
            <UserIdDispatchContext.Provider value={setUserId}>
                {children}
            </UserIdDispatchContext.Provider>
        </UserIdContext.Provider>
    );
};

export const useUserIdContext = () => {
    const context = useContext(UserIdContext);
    return context;
};

export const useUserIdDispatchContext = () => {
    const context = useContext(UserIdDispatchContext);
    return context;
};
// =========  ID
// =========  PW
export const UserPwContextProvider = ({ children }: any) => {
    const [userPw, setUserPw] = useState("");

    return (
        <UserPwContext.Provider value={userPw}>
            <UserPwDispatchContext.Provider value={setUserPw}>
                {children}
            </UserPwDispatchContext.Provider>
        </UserPwContext.Provider>
    );
};

export const useUserPwContext = () => {
    const context = useContext(UserPwContext);
    return context;
};

export const useUserPwDispatchContext = () => {
    const context = useContext(UserPwDispatchContext);
    return context;
};
// =========  PW
