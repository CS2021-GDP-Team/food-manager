import React from "react";
import { List, ListItem, ListItemText, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 360,
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
    }
});

export default function SimpleList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                    <ListItemText className={classes.title} primary="My body info" />
                    <ListItemText className={classes.content} primary="190cm / 90kg" />
                </ListItem>
                <Divider className={classes.border} />
                <ListItem>
                    <ListItemText className={classes.title} primary="Exp date notify" />
                    <ListItemText className={classes.content} primary="Once a day / 12:00PM" />
                </ListItem>
                <Divider className={classes.border} />
                <ListItem>
                    <ListItemText className={classes.title} primary="Liked recipe" />
                </ListItem>
                <Divider className={classes.border} />
                <ListItem>
                    <ListItemText primary="2021.3.20" />
                    <ListItemText primary="대패삼겹살을 넣은 두부김치" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2021.3.18" />
                    <ListItemText primary="콘꼬노미야키 만들기" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2021.3.11" />
                    <ListItemText primary="밥도둑 반찬 고추장 달걀조림" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2021.3.10" />
                    <ListItemText primary="얼큰한 순두부찌개" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2021.3.8" />
                    <ListItemText primary="리코타치즈 샐러드" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2021.3.7" />
                    <ListItemText primary="야식으로 먹기 좋은 불막창" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2021.3.5" />
                    <ListItemText primary="간단하게 만드는 규동" />
                </ListItem>
            </List>
        </div>
    );
}
