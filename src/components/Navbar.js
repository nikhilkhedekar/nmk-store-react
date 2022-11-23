import React, { useContext, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import LogoutButton from './Auth/LogoutButton';

import {
  Stack, Typography, Box, AppBar, IconButton, Toolbar,
  Button, Menu, MenuItem, ButtonGroup
} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserMenu from './User/UserMenu';

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const logoutRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Stack>
      <Stack>
        <Link to='/' >
          <Typography gutterBottom variant='h1' align='center' > NMK STORE </Typography>
        </Link>
      </Stack>
      <Stack>
        {authCtx.isLoggedIn ? (
          <AppBar position='static' color='transparent'>
            <Toolbar>
              <UserMenu ref={userMenuRef} />
              <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                <FaceIcon />
              </IconButton>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Hello, {authCtx.user.name || authCtx.user.role}
              </Typography>
              <ButtonGroup aria-label='alignment button group'>
                <Button
                  color='inherit'
                  id='resources-button'
                  aria-controls={open ? 'resources-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleClick}>
                  Products
                </Button>
                <Button
                  variant='contained'
                  startIcon={<FaceIcon />}
                  onClick={() => { navigate("/dashboard") }}>
                  User Profile
                </Button>
                <Button
                  variant='contained'
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => { navigate("/cart") }}>
                  Cart Count
                </Button>
                <LogoutButton ref={logoutRef} />
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar position='static' color='transparent'>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Hello
              </Typography>
              <ButtonGroup aria-label='alignment button group'>
                <Button
                  color='inherit'
                  id='resources-button'
                  aria-controls={open ? 'resources-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleClick}>
                  Products
                </Button>
                <Button
                  variant='contained'
                  startIcon={<LoginIcon />}
                  onClick={() => { navigate("/login") }}>
                  Login
                </Button>
                <Button
                  variant='contained'
                  startIcon={<AppRegistrationIcon />}
                  onClick={() => { navigate("/register") }}>
                  Register
                </Button>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        )}
      </Stack>
      <Menu
        id='resources-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        MenuListProps={{
          'aria-labelledby': 'resources-button'
        }}>
        <MenuItem onClick={() => {
          navigate("/products");
          handleClose();
        }}>All Products</MenuItem>
        <MenuItem onClick={() => {
          navigate("/reviews");
          handleClose();
        }}>All Reviews</MenuItem>
      </Menu>
    </Stack>
  );
};

export default Navbar;
