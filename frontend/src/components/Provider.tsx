import React from "react";
import ViewModel from "./ViewModel";
import { MenuListContextProvider } from "./Model";
const Provider = () => (
    <MenuListContextProvider>
        <ViewModel />
    </MenuListContextProvider>
);

export default Provider;
