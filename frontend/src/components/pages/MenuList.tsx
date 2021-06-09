import React, { memo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, List } from "@material-ui/core";
import { SwapVert, Search } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { ListItem } from "../index";
import axios from "axios";
import { useMenuListContext, useMenuListDispatchContext } from "../Model";
interface itemProps {
    id: number;
    user_id: number;
    ingredient_id: number;
    put_date: string;
    expire_date: string;
    custom_ingredient: string;
    ingredient_name: string;
}

const MenuList = () => {
    const history = useHistory();
    const [menuList, setMenuList] = [useMenuListContext(), useMenuListDispatchContext()];
    const [defaultList, setDefaultList] = useState<itemProps[]>([]);
    useEffect(() => {
        const getList = async () => {
            try {
                const data = (await axios.get("/food-manager/api/user_fridge")).data;
                setMenuList(data);
                setDefaultList(data);
            } catch (e) {
                console.log(e);
                history.push("/login");
            }
        };
        getList();
    }, []);
    const [order, setOrder] = useState<boolean>(true);
    const sortByExp = () => {
        order
            ? setMenuList(
                  [...menuList].sort((a, b): number => {
                      return +new Date(a.expire_date) - +new Date(b.expire_date);
                  })
              )
            : setMenuList(
                  [...menuList].sort((a, b): number => {
                      return +new Date(b.expire_date) - +new Date(a.expire_date);
                  })
              );
        setOrder(!order);
    };
    let timer: any;
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            if (e.target.value === "") {
                setMenuList([...defaultList]);
            } else {
                setMenuList(
                    defaultList.filter(
                        (item) =>
                            item.custom_ingredient.includes(e.target.value) ||
                            item.ingredient_name.includes(e.target.value)
                    )
                );
            }
        }, 500);
    };

    return (
        <div className="list-container">
            <div id="list-header">
                <div id="list-input">
                    <input type="text" onChange={handleSearch}></input>
                    <Search id="list-icon" />
                </div>
                <IconButton aria-label="sort" onClick={sortByExp}>
                    <SwapVert style={{ color: grey[50], fontSize: 30 }} />
                </IconButton>
            </div>
            <List id="list-items">
                {menuList.map((value) => (
                    <ListItem
                        id={value.id}
                        user_id={value.user_id}
                        ingredient_id={value.ingredient_id}
                        put_date={value.put_date}
                        expire_date={value.expire_date}
                        custom_ingredient={value.custom_ingredient}
                        ingredient_name={value.ingredient_name}
                    />
                ))}
                {/* <ListItem
                    id={1}
                    user_id={2}
                    ingredient_id={1}
                    put_date={"2021-04-19"}
                    expire_date={"2021-04-22"}
                /> */}
            </List>
        </div>
    );
};

export default memo(MenuList);
