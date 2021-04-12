import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, List } from "@material-ui/core";
import { SwapVert, Search } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { ListItem } from "../index";
import axios from "axios";

const MenuList = ({ menu }: any) => {
    const history = useHistory();
    // useEffect(() => {
    //     const getList = async () => {
    //         try {
    //             const data = await axios.get("/api/ingredients");
    //             console.log(data);
    //         } catch {
    //             history.push("/login");
    //         }
    //     };
    //     getList();
    // });
    return (
        <div className="list-container">
            <div id="list-header">
                <div id="list-input">
                    <input></input>
                    <Search id="list-icon" />
                </div>
                <IconButton aria-label="sort">
                    <SwapVert style={{ color: grey[50], fontSize: 30 }} />
                </IconButton>
            </div>
            <List id="list-items">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </List>
        </div>
    );
};

export default MenuList;
