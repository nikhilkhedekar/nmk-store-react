import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../axiosinstance';
import AuthContext from '../../contexts/authContext';

import {
  TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
  Paper, Grid, Stack
} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import AuthBottomNav from '../../components/Auth/AuthBottomNav';

import Map, { Marker, Popup } from 'react-map-gl';
import MyLocationIcon from '@mui/icons-material/MyLocation';

function Register() {
  const MAPBOX_TOKEN = "pk.eyJ1IjoibmlraGlsa2hlZGVrYXIiLCJhIjoiY2w5czE1ZGZ4MDdiZTN2cDBvemo0YjBqeSJ9.ZOMYJhoJ1YWj2JbfhQI3qg";
  const [registerUser, setRegisterUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [lngLat, setLngLat] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: null,
    longitude: null,
    zoom: 1,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [currentLocationState, setCurrentLocationState] = useState(false);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const getcurrentLocation = () => {    
    setCurrentLocationState(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLngLat([position.coords.longitude, position.coords.latitude]);
      setViewState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 13,
      });
      setShowPopup(true);
      console.log("coordinates", { lng: position.coords.longitude, lat: position.coords.latitude, zoom: viewState.zoom });
    }, (error) => {
      console.log("Error", error);
    }, {
      enableHighAccuracy: true,
      // timeout: 5000,
      // maximumAge: 0
    });
  }

  const onSubmit = () => {
    try {
      const data = authCtx.register(registerUser.name, registerUser.email, registerUser.password, 
        registerUser.address, lngLat[0], lngLat[1] );
      console.log("registerredUser", data);
      setRegisterUser({ name: '', email: '', password: '' });
      setLngLat([]);
      alert("Success! Please check your email to verify account");
      navigate("/login");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Paper sx={{ padding: '32px' }} elevation={2}>
        <Grid rowSpacing={2} columnSpacing={1} container my={4}>
          <Grid item xs={6}>
            <TextField
              label='Name'
              required
              helperText={
                !registerUser.name && 'Required'
              }
              fullWidth
              type='text'
              error={!registerUser.name}
              name="name"
              value={registerUser.name}
              onChange={handleChange}
            // onFocus={}
            // onBlur={}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Email'
              required
              helperText={
                !registerUser.email ? 'Required' : 'We will not share your email with anyone'
              }
              fullWidth
              type='email'
              error={!registerUser.email}
              name="email"
              value={registerUser.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='Password'
              required
              helperText={
                !registerUser.password ? 'Required' : 'Do not share your password with anyone'
              }
              fullWidth
              error={!registerUser.password}
              name="password"
              value={registerUser.password}
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

          <Grid item xs={6}>
            <TextField
              label='address, city, pincode, state, country'
              fullWidth
              name="address"
              value={registerUser.address}
              onChange={handleChange}
              type="text"
            />
          </Grid>

          <Stack spacing={2} direction='row' margin={2} >
          <LoadingButton size="large" type="submit" variant="contained" 
            onClick={getcurrentLocation}
            startIcon={<MyLocationIcon />} >
            Current Location
          </LoadingButton>

          <LoadingButton size="large" type="submit" variant="contained"
            onClick={onSubmit}
            startIcon={<AppRegistrationIcon />}>
            Register
          </LoadingButton>
          </Stack>
        </Grid>

        {
          currentLocationState && (
            <Map
              id="userLocation"
              
              style={{ width: 800, height: 500 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              <Marker longitude={viewState.longitude} latitude={viewState.latitude} />
              {
                showPopup && (
                  <Popup longitude={viewState.longitude}
                    latitude={viewState.latitude}
                    anchor="bottom"
                    onClose={() => setShowPopup(false)}>
                    My Location
                  </Popup>
                )
              }
            </Map>
          )
        }
      </Paper>

      {/* <AuthBottomNav bottomNavValueArg={0} /> */}
    </>
  );
}

export default Register;
