import { useEffect, useState } from "react";
import {
    TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
    Paper, Grid, Stack
} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LockResetIcon from '@mui/icons-material/LockReset';
import { ForgotPassword, Login, Register } from "../../pages";
import AuthPage from "./AuthPage";

const AuthBottomNav = ({ bottomNavValueArg }) => {
    const [bottomNavValue, setBottomNavValue] = useState(0);
    useEffect(() => {
        setBottomNavValue(bottomNavValueArg);
    }, []);
    return (        
        <Stack>
            <AuthPage bottomNavValue={bottomNavValue} />
            <BottomNavigation
                sx={{ width: '100%', position: 'absolute', bottom: 0 }}
                showLabels
                value={bottomNavValue}
                onChange={(event, newValue) => {
                    setBottomNavValue(newValue)
                }}>
                <BottomNavigationAction value={0} label='Register' icon={<AppRegistrationIcon />} />
                <BottomNavigationAction value={1} label='Login' icon={<LoginIcon />} />
                <BottomNavigationAction value={2} label='Forgot Password' icon={<LockResetIcon />} />
            </BottomNavigation>
        </Stack>
    )
}

export default AuthBottomNav 