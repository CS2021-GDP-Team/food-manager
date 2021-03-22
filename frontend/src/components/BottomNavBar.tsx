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

export default function BottomNavBar() {
    const parentClasses = useStylesParent();
    const childClasses = useStylesChild();
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
                icon={<CropFreeOutlinedIcon />}
            />
            <BottomNavigationAction
                label="List"
                classes={{ root: childClasses.root, selected: childClasses.selected }}
                icon={<KitchenOutlinedIcon />}
            />
            <BottomNavigationAction
                label="Recipe"
                classes={{ root: childClasses.root, selected: childClasses.selected }}
                icon={<MenuBookOutlinedIcon />}
            />
            <BottomNavigationAction
                label="My Page"
                classes={{ root: childClasses.root, selected: childClasses.selected }}
                icon={<PermIdentityOutlinedIcon />}
            />
        </BottomNavigation>
    );
}
