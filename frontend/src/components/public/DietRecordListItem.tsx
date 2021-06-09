import React from "react";
import { ListItem, ListItemText, IconButton, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useDietRecordDispatchContext, useDietRecordContext } from "../Model";
import axios from "axios";

interface recordProps {
    id: number;
    put_date: string;
    recipe_id: number;
    recipe_name: string;
}

const useStyles = makeStyles({
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});

export default function DietRecordListItem({ id, put_date, recipe_id, recipe_name }: recordProps) {
    const [dietRecord, setDietRecord] = [useDietRecordContext(), useDietRecordDispatchContext()];
    const classes = useStyles();
    const handleDelete = async () => {
        try {
            await axios.delete("/food-manager/api/user_diet", {
                data: { dietId: id }
            });
            setDietRecord(dietRecord.filter((diet) => diet.id !== id));
        } catch (e) {
            console.log(e);
            alert("삭제하는동안 오류가 발생했습니다.");
        }
    };

    return (
        <ListItem>
            <ListItemText primary={put_date.slice(0, 10)} />
            <ListItemText primary={recipe_name} />
            <IconButton onClick={handleDelete}>
                <Close className={classes.deleteIcon} />
            </IconButton>
        </ListItem>
    );
}
