import React from "react";
import { Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Login, MenuList, SignUp } from "./index";
import { useMenuListContext, useMenuListDispatchContext } from "./Model";

const ViewModel: React.FC = () => {
    const menuList = useMenuListContext();
    const setMenuList = useMenuListDispatchContext();
    // handel 함수를 사용하고자 하는 view에다가 전달한다음에 이 핸들 안에서 setMenuList 를 해야
    // menuList 가 바뀔 때 view 가 업데이트 됨
    const handleMenuList = () => {};

    return (
        <div className="background-container">
            {/* <Paper className="login-container" elevation={10}></Paper> 로그인 할 때 사용 */}
            <Paper className="main-container" elevation={10}>
                <div className="main-content">
                    <Route exact path="/" render={() => <MenuList menu={menuList} />} />
                    {/* 백엔드 연결하면 로그인, 회원가입 페이지는 상위로 빼낼 예정 */}
                    <Route path="/login" render={() => <Login />} />
                </div>
                <div className="footer">하단 메뉴바</div>
            </Paper>
        </div>
    );
};

export default ViewModel;
