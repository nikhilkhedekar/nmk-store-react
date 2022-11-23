import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

import LockResetIcon from '@mui/icons-material/LockReset';
import {
  TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
  Paper, Grid, Typography
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please provide email');
      return;
    }
    try {
      const data = authCtx.forgotPassword(email);
      console.log("forgotPasswordResp", data);
      setEmail("");
      navigate("/");
    } catch (error) {
      alert({
        text: 'Something went wrong, please try again',
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
    >
      <Paper sx={{ padding: '32px' }} elevation={2}>
        <Grid rowSpacing={2} columnSpacing={1} container my={4}>
          <Grid item xs={6}>
            <TextField
              label='Email'
              required
              helperText={
                !email ? 'Required' : 'We will not share your email with anyone'
              }
              fullWidth
              type='email'
              error={!email}
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Grid>

          <LoadingButton fullWidth size="large" type="submit" variant="contained"
            // onClick={ }
            startIcon={<LockResetIcon />}>
            Get Reset Password Link
          </LoadingButton>
          <Typography variant='h6' >
            Already a have an account?
            <Link to='/login'>
              Log In
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </form>
  );
};

export default ForgotPassword;
