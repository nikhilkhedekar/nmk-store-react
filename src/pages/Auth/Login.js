import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

import {
  TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
  Paper, Grid, Typography
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import Notify from '../../components/Notify';

function Login() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [logInUser, setLogInUser] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setLogInUser({ ...logInUser, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {    
    try {
      const data = authCtx.login(logInUser.email, logInUser.password);
      console.log("loginUser", data);
      setLogInUser({ email: '', password: '' });
      setMessage("Logged in successfully");
      setOpen(true);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error", error);
      setMessage(error);
      setOpen(true);
    }
  };

  return (
    <>
      <Paper sx={{ padding: '32px' }} elevation={2}>
        <Grid rowSpacing={2} columnSpacing={1} container my={4}>
          <Grid item xs={6}>
            <TextField
              label='Email'
              required
              helperText={
                !logInUser.email ? 'Required' : 'We will not share your email with anyone'
              }
              fullWidth
              type='email'
              error={!logInUser.email}
              name="email"
              value={logInUser.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='Password'
              required
              helperText={
                !logInUser.password ? 'Required' : 'Do not share your password with anyone'
              }
              fullWidth
              error={!logInUser.password}
              name="password"
              value={logInUser.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Box component={Icon} icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <LoadingButton fullWidth size="large" type="submit" variant="contained"
            onClick={onSubmit}
            startIcon={<LoginIcon />}>
            Login
          </LoadingButton>
          <Typography variant='h6' >
            Forgot your password?{' '}
            <Link to='/forgot-password'>
              Forgot Password
            </Link>
          </Typography>
        </Grid >
      </Paper>
      <Notify message={message} open={open} handleClose={() => setOpen(false)} />
    </>
  );
}

export default Login;
