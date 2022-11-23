import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, useSearchParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

import LoginIcon from '@mui/icons-material/Login';
import {
  Stack, Typography, Box, AppBar, IconButton, Toolbar,
  Button, Menu, MenuItem, ButtonGroup, Paper
} from "@mui/material";

const VerifyPage = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setSearchParams(location.search);
        const verificationToken = searchParams.get("token");
        const email = searchParams.get("email");
        const data = authCtx.verifyEmail(verificationToken, email);
        console.log("verifiedUser", data);
      } catch (error) {
        console.log(error.response);
      }
    };
    verifyToken();
  }, []);

  return (
    <Paper sx={{ padding: '32px' }} elevation={2}>
      <Box p={2} width='250px' role='presentation' textAlign='center'>
        <Typography varient={"h3"}>Account Confirmed</Typography>
        <Button
          variant='contained'
          startIcon={<LoginIcon />}
          onClick={() => { navigate("/login") }}>
          Please Login
        </Button>
      </Box>
    </Paper>
  );
};

export default VerifyPage;
