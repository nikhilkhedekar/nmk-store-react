import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

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

function Dashboard() {
  const authCtx = useContext(AuthContext);  
  console.log("authCtx", authCtx);
  return (
      <Stack>
        <Typography variant='h3' >Hello there, {authCtx?.user?.name}</Typography>
        <Stack>
          <Typography variant='h6' >
            Your ID : {authCtx?.user?.userId}
          </Typography>
          <Typography variant='h6' >
            Your Role : {authCtx?.user?.role}
          </Typography>
        </Stack>
      </Stack>    
  );
}

export default Dashboard;
