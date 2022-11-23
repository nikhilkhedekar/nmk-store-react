import { forwardRef, useImperativeHandle, useState } from "react"
import { Link } from "react-router-dom"
import HistoryIcon from '@mui/icons-material/History';
import LockResetIcon from '@mui/icons-material/LockReset';
import MenuIcon from '@mui/icons-material/Menu'
import EditIcon from '@mui/icons-material/Edit';
import {
    TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
    Paper, Grid, Drawer, Typography,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Divider,
    ListItemAvatar,
    Avatar,
    Stack
} from "@mui/material";

const UserMenu = forwardRef((props, ref) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const drawerHandler = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    useImperativeHandle(ref, () => {
        return {
            drawerHandler,
        }
    });

    return (
        <Stack border='none' spacing={2}>
            <IconButton
                onClick={drawerHandler}
                size='large'
                edge='start'
                color='inherit'
                aria-label='logo'>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={drawerHandler} >
                    <Box p={2} width='250px' role='presentation' textAlign='center' sx={{ width: '400px', bgcolor: '#efefef' }}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    <Link to="/update-user" onClick={drawerHandler} > Update User Info </Link>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LockResetIcon />
                                    </ListItemIcon>
                                    <Link to="/update-user-password" onClick={drawerHandler} > Reset Password </Link>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HistoryIcon />
                                    </ListItemIcon>
                                    <Link to="/orders/user-orders" onClick={drawerHandler} > Your Order History </Link>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
            </Drawer>
        </Stack >
    )
});

export default UserMenu