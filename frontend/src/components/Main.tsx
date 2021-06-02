import React from "react";
import { Route, useLocation } from "react-router-dom";
import { Login, MenuList, SignUp, Picture, Info, RecipeList, BottomNavBar } from "./index";
import { CssBaseline, Paper } from "@material-ui/core";

const Main: React.FC = () => {
    // 현재 페이지에 login 이나 signup text가 있으면 checkUrl 이 true
    const location = useLocation();
    const checkUrl =
        location.pathname.indexOf("login") !== -1 || location.pathname.indexOf("signup") !== -1;

    return (
        <div className="background-container">
            <CssBaseline>
                <Paper className="main-container" elevation={10}>
                    <div className="main-content">
                        <Route exact path="/" render={() => <MenuList />} />
                        <Route path="/food-manager" render={() => <MenuList />} />
                        <Route path="/picture" render={() => <Picture />} />
                        <Route path="/info" render={() => <Info />} />
                        <Route path="/recipe" render={() => <RecipeList />} />
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

export default Main;
