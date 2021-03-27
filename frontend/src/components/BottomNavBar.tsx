import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CropFreeOutlinedIcon from "@material-ui/icons/CropFreeOutlined";
import KitchenOutlinedIcon from "@material-ui/icons/KitchenOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";

//TODO : 스타일링 코드 바깥으로 빼내기, TS로 변경, 이벤트처리->라우팅 연결

const useStyles = makeStyles({
    parent: {
        borderTop: "1px solid #606060",
        display: "fixed",
        backgroundColor: "#414141",
        height: "10%",
        width: "100%",
        marginTop: "auto"
    },
    child: {
        color: "#FFFFFF",
        border: "2px",
        borderColor: "#606060",
        "&$selected": {
            color: "#00D6AF"
        }
    },
    selected: {},
    icon: {
        fontSize: "30px"
    }
});

const BottomNavBar = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const history = useHistory();
    // 강 버튼별 링크로 이동 함수
    const handleChange = (e: React.ChangeEvent<{}>, value: number) => {
        setValue(value);
        switch (value) {
            case 0:
                history.push("/picture");
                break;
            case 1:
                history.push("/");
                break;
            case 2:
                history.push("/recipe");
                break;
            case 3:
                history.push("/info");
                break;
        }
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.parent}
        >
            <BottomNavigationAction
                label="Add"
                selected
                classes={{ root: classes.child, selected: classes.selected }}
                icon={<CropFreeOutlinedIcon classes={{ root: classes.icon }} />}
            />
            <BottomNavigationAction
                label="List"
                classes={{ root: classes.child, selected: classes.selected }}
                icon={<KitchenOutlinedIcon classes={{ root: classes.icon }} />}
            />
            <BottomNavigationAction
                label="Recipe"
                classes={{ root: classes.child, selected: classes.selected }}
                icon={<MenuBookOutlinedIcon classes={{ root: classes.icon }} />}
            />
            <BottomNavigationAction
                label="My Page"
                classes={{ root: classes.child, selected: classes.selected }}
                icon={<PermIdentityOutlinedIcon classes={{ root: classes.icon }} />}
            />
        </BottomNavigation>
    );
};

export default BottomNavBar;
