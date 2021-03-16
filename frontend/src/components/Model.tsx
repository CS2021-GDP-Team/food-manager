import React, { useState, createContext, useContext, Dispatch } from "react";

const MenuListContext = createContext<string[] | null>(null);
const MenuListDispatchContext = createContext<Dispatch<string[]> | null>(null);

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
