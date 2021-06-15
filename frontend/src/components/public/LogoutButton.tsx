import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//TODO : 이벤트처리

const useStyles = makeStyles({
    root: {
        color: "#FFFFFF"
    }
});
/**
 * 로그아웃 버튼 컴포넌트
 */
const LogoutButton = () => {
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = async () => {
        await axios
            .post("/food-manager/api/logout")
            .then(() => {
                history.push("/login");
            })
            .catch((e) => {
                console.log(e);
                alert("잠시후 다시 시도해주시기 바랍니다.");
            });
    };

    return (
        <IconButton className={classes.root} onClick={handleLogout}>
            <ExitToAppIcon />
        </IconButton>
    );
};

export default LogoutButton;
