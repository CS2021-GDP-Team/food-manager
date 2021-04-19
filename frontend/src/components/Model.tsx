import React, { useState, createContext, useContext, Dispatch } from "react";

// =========  menuList
interface itemProps {
    id: number;
    user_id: number;
    ingredient_id: number;
    put_date: string;
    expire_date: string;
}
const MenuListContext = createContext<itemProps[]>([]);
const MenuListDispatchContext = createContext<Dispatch<itemProps[]>>(Array);
export const MenuListContextProvider = ({ children }: any) => {
    const [menuList, setMenuList] = useState<itemProps[]>([]);

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

const UserIdContext = createContext<string>("");
const UserIdDispatchContext = createContext<Dispatch<string>>(String);
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
const UserPwContext = createContext<string>("");
const UserPwDispatchContext = createContext<Dispatch<string>>(String);
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
