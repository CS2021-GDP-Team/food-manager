import React from "react";
import { Divider } from "@material-ui/core";
import ItemBox from "@material-ui/core/ListItem";
import { grey } from "@material-ui/core/colors";

const ListItem = () => {
    return (
        <>
            <ItemBox button>
                <div>dd</div>
            </ItemBox>
            <Divider style={{ backgroundColor: grey[600] }} />
        </>
    );
};

export default ListItem;
