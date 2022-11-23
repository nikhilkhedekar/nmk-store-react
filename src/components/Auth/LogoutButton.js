import { forwardRef, useContext, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = forwardRef((props, ref) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = () => {
        authCtx.logout();
        navigate("/");
    }

    useImperativeHandle(ref, () => {
        return {
            handleClick,
        }
    })

    return (
        <Button
            variant='contained'
            startIcon={<LogoutIcon />}
            onClick={handleClick}>
            Logout
        </Button>
    )
})

export default LogoutButton