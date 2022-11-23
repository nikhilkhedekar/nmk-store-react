import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/userActions";
import AxiosInstance from "../../axiosinstance";
import AuthContext from "../../contexts/authContext";

import {
    TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
    Paper, Grid, Stack
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import Map, { Marker, Popup } from 'react-map-gl';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import UpdateMobile from "./UpdateMobile";

const UpdateUser = () => {
    const MAPBOX_TOKEN = "pk.eyJ1IjoibmlraGlsa2hlZGVrYXIiLCJhIjoiY2w5czE1ZGZ4MDdiZTN2cDBvemo0YjBqeSJ9.ZOMYJhoJ1YWj2JbfhQI3qg";
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        address: ""
    });
    const [lngLat, setLngLat] = useState([]);
    const [viewState, setViewState] = useState({
        latitude: null,
        longitude: null,
        zoom: 13,
    });
    const [showPopup, setShowPopup] = useState(false);
    const [currentLocationState, setCurrentLocationState] = useState(false);

    const changeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
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

    const submitHandler = () => {
        dispatch(updateUser({ ...userData, long: lngLat[0], lat: lngLat[1] }))
        setUserData({
            name: "",
            email: "",
            address: ""
        });
        setLngLat([])
    }
    return (
        <Paper sx={{ padding: '32px' }} elevation={2}>
            <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                <Grid item xs={6}>
                    <TextField
                        label='Name'
                        required
                        helperText={
                            !userData.name && 'Required'
                        }
                        fullWidth
                        type='text'
                        error={!userData.name}
                        name="name"
                        value={userData.name}
                        onChange={changeHandler}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        label='Email'
                        required
                        helperText={
                            !userData.email ? 'Required' : 'We will not share your email with anyone'
                        }
                        fullWidth
                        type='email'
                        error={!userData.email}
                        name="email"
                        value={userData.email}
                        onChange={changeHandler}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        label='address, city, pincode, state, country'
                        fullWidth
                        name="address"
                        value={userData.address}
                        onChange={changeHandler}
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
                        onClick={submitHandler}
                        startIcon={<EditIcon />}>
                        Update User Info
                    </LoadingButton>
                </Stack>
            </Grid>

            <Stack>
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
            </Stack>
            <UpdateMobile />
        </Paper>
    )
}

export default UpdateUser