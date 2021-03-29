import React from "react";
import { Route, useLocation } from "react-router-dom";
import { Login, MenuList, SignUp, Picture, Info, Recipe, BottomNavBar } from "./index";
import { useMenuListContext, useMenuListDispatchContext } from "./Model";
import { CssBaseline, Paper } from "@material-ui/core";

const ViewModel: React.FC = () => {
    // 현재 페이지에 login 이나 signup text가 있으면 checkUrl 이 true
    const location = useLocation();
    const checkUrl =
        location.pathname.indexOf("login") !== -1 || location.pathname.indexOf("signup") !== -1;
    const menuList = useMenuListContext();
    const setMenuList = useMenuListDispatchContext();
    // handel 함수를 사용하고자 하는 view에다가 전달한다음에 이 핸들 안에서 setMenuList 를 해야
    // menuList 가 바뀔 때 view 가 업데이트 됨
    const handleMenuList = () => {};

    return (
        <div className="background-container">
            <CssBaseline>
                <Paper className="main-container" elevation={10}>
                    <div className="main-content">
                        <Route exact path="/" render={() => <MenuList menu={menuList} />} />
                        <Route path="/picture" render={() => <Picture />} />
                        <Route path="/info" render={() => <Info />} />
                        <Route path="/recipe" render={() => <Recipe />} />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="/signup" render={() => <SignUp />} />
                    </div>
                    {/* checkUrl 이 true 면 Nav 안 띄움 */}
                    {!checkUrl && <BottomNavBar />}
                </Paper>
            </CssBaseline>
        </div>
    );
};

export default ViewModel;
