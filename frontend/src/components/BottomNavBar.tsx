import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {
    CropFreeOutlined,
    KitchenOutlined,
    MenuBookOutlined,
    PermIdentityOutlined
} from "@material-ui/icons";

const useStyles = makeStyles({
    parent: {
        borderTop: "1px solid #606060",
        position: "absolute",
        backgroundColor: "#414141",
        height: "10%",
        width: "100%",
        bottom: "0"
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
/**
 * 전체 레이아웃에 쓰일 footer 컴포넌트
 */
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
                icon={<CropFreeOutlined classes={{ root: classes.icon }} />}
            />
            <BottomNavigationAction
                label="List"
                classes={{ root: classes.child, selected: classes.selected }}
                icon={<KitchenOutlined classes={{ root: classes.icon }} />}
            />
            <BottomNavigationAction
                label="Recipe"
                classes={{ root: classes.child, selected: classes.selected }}
                icon={<MenuBookOutlined classes={{ root: classes.icon }} />}
            />
            <BottomNavigationAction
                label="My Page"
                classes={{ root: classes.child, selected: classes.selected }}
                icon={<PermIdentityOutlined classes={{ root: classes.icon }} />}
            />
        </BottomNavigation>
    );
};

export default BottomNavBar;
