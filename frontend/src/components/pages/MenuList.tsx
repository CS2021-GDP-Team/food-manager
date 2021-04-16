import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, List } from "@material-ui/core";
import { SwapVert, Search } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { ListItem } from "../index";
import axios from "axios";

interface itemProps {
    id: number;
    user_id: number;
    ingredient_id: number;
    put_date: string;
    expire_date: string;
}

const MenuList = () => {
    const history = useHistory();
    const [data, setData] = useState<Array<itemProps> | null>(null);
    useEffect(() => {
        const getList = async () => {
            try {
                setData((await axios.get("/food-manager/api/user_fridge")).data);
                console.log(data);
            } catch (e) {
                console.log(e);
                history.push("/login");
            }
        };
        getList();
    });
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
                {data &&
                    data.map((value) => (
                        <ListItem
                            id={value.id}
                            user_id={value.user_id}
                            ingredient_id={value.ingredient_id}
                            put_date={value.put_date}
                            expire_date={value.expire_date}
                        />
                    ))}
            </List>
        </div>
    );
};

export default MenuList;
