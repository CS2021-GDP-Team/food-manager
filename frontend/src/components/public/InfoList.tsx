import React, { memo, useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Collapse,
    IconButton,
    makeStyles
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Edit } from "@material-ui/icons";
import LikedListItem from "./LikedListItem";
import DietRecordListItem from "./DietRecordListItem";
import { useDietRecordContext, useLikedRecipeContext } from "../Model";

const useStyles = makeStyles({
    root: {
        width: "100%",
        backgroundColor: "#414141"
    },
    border: {
        backgroundColor: "#606060"
    },
    title: {
        textAlign: "left",
        color: "#00d6af"
    },
    content: {
        textAlign: "right"
    },
    editIcon: {
        fontSize: "15px",
        color: "white"
    },
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});

const InfoList = () => {
    const classes = useStyles();
    const [likedOpen, setLikedOpen] = useState(false);
    const [logOpen, setLogOpen] = useState(false);

    const likedHandleClick = () => {
        setLikedOpen(!likedOpen);
    };
    const logHandleClick = () => {
        setLogOpen(!logOpen);
    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="total user info">
                <ListItem>
                    <ListItemText className={classes.title} primary="My body info" />
                    <ListItemText className={classes.content} primary="190cm / 90kg" />
                    <IconButton>
                        <Edit className={classes.editIcon} />
                    </IconButton>
                </ListItem>
                <Divider className={classes.border} />
                <ListItem>
                    <ListItemText className={classes.title} primary="Exp date notify" />
                    <ListItemText className={classes.content} primary="Once a day / 12:00PM" />
                    <IconButton>
                        <Edit className={classes.editIcon} />
                    </IconButton>
                </ListItem>
                <Divider className={classes.border} />
                <ListItem button onClick={logHandleClick}>
                    <ListItemText className={classes.title} primary="Diet records" />
                    {logOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={logOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {useDietRecordContext().map((value) => (
                            <DietRecordListItem
                                id={value.id}
                                recipe_id={value.recipe_id}
                                put_date={value.put_date}
                                recipe_name={value.recipe_name}
                            />
                        ))}
                    </List>
                </Collapse>
                <Divider className={classes.border} />
                <ListItem button onClick={likedHandleClick}>
                    <ListItemText className={classes.title} primary="Liked recipe" />
                    {likedOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={likedOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {useLikedRecipeContext().map(
                            (value) =>
                                value.score > 0 && (
                                    <LikedListItem
                                        recipe_id={value.recipe_id}
                                        id={value.id}
                                        user_id={value.user_id}
                                        score={value.score}
                                        recipe_name={value.recipe_name}
                                    />
                                )
                        )}
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default memo(InfoList);
