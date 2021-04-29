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
// =========  menuList
interface recipeProps {
    id: number;
    name: string;
    source: string | null;
    kcal: string | null;
    protein: string | null;
    carbo: string | null;
    fat: string | null;
    salt: string | null;
}
const RecipeListContext = createContext<recipeProps[]>([]);
const RecipeListDispatchContext = createContext<Dispatch<recipeProps[]>>(Array);
export const RecipeListContextProvider = ({ children }: any) => {
    const [recipeList, setRecipeList] = useState<recipeProps[]>([]);

    return (
        <RecipeListContext.Provider value={recipeList}>
            <RecipeListDispatchContext.Provider value={setRecipeList}>
                {children}
            </RecipeListDispatchContext.Provider>
        </RecipeListContext.Provider>
    );
};

export const useRecipeListContext = () => {
    const context = useContext(RecipeListContext);
    return context;
};

export const useRecipeListDispatchContext = () => {
    const context = useContext(RecipeListDispatchContext);
    return context;
};
