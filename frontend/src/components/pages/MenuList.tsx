import React from "react";
import { IconButton, List } from "@material-ui/core";
import { SwapVert, Search } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";
import { ListItem } from "../index";

const MenuList = ({ menu }: any) => {
    return (
        <div className="list-container">
            <div id="list-header">
                <div id="list-input">
                    <input></input>
                    <Search id="list-icon" />
                </div>
                <IconButton aria-label="sort">
                    <SwapVert style={{ color: blue[50], fontSize: 30 }} />
                </IconButton>
            </div>
            <List id="list-items">
                <ListItem />
            </List>
        </div>
    );
};

export default MenuList;
