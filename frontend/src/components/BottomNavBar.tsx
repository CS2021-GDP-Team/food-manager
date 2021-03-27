import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CropFreeOutlinedIcon from "@material-ui/icons/CropFreeOutlined";
import KitchenOutlinedIcon from "@material-ui/icons/KitchenOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";

const useStylesParent = makeStyles({
    root: {
        borderTop: "1px solid #606060",
        display: "fixed",
        backgroundColor: "#414141",
        height: "10%",
        width: "100%",
        marginTop: "auto"
    }
});

const useStylesChild = makeStyles({
    root: {
        color: "#FFFFFF",
        border: "2px",
        borderColor: "#606060",
        "&$selected": {
            color: "#00D6AF"
        }
    },
    selected: {}
});

const useStylesIcon = makeStyles({
    root: {
        fontSize: "30px"
    }
});

export default function BottomNavBar() {
    const parentClasses = useStylesParent();
    const childClasses = useStylesChild();
    const iconClasses = useStylesIcon();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={parentClasses.root}
        >
            <BottomNavigationAction
                label="Add"
                selected
                classes={{ root: childClasses.root, selected: childClasses.selected }}
                icon={<CropFreeOutlinedIcon classes={{ root: iconClasses.root }} />}
            />
            <BottomNavigationAction
                label="List"
                classes={{ root: childClasses.root, selected: childClasses.selected }}
                icon={<KitchenOutlinedIcon classes={{ root: iconClasses.root }} />}
            />
            <BottomNavigationAction
                label="Recipe"
                classes={{ root: childClasses.root, selected: childClasses.selected }}
                icon={<MenuBookOutlinedIcon classes={{ root: iconClasses.root }} />}
            />
            <BottomNavigationAction
                label="My Page"
                classes={{ root: childClasses.root, selected: childClasses.selected }}
                icon={<PermIdentityOutlinedIcon classes={{ root: iconClasses.root }} />}
            />
        </BottomNavigation>
    );
}
