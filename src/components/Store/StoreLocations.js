import { useEffect, useState } from "react";
import Map, { useMap, Marker, Popup } from "react-map-gl";
import { Stack } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { getAllStoreActions } from "../../actions/storeActions";

const StoreLocations = () => {
    const MAPBOX_TOKEN = "pk.eyJ1IjoibmlraGlsa2hlZGVrYXIiLCJhIjoiY2w5czE1ZGZ4MDdiZTN2cDBvemo0YjBqeSJ9.ZOMYJhoJ1YWj2JbfhQI3qg";
    const dispatch = useDispatch();
    const storesState = useSelector(state => state.stores);
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        dispatch(getAllStoreActions());
    }, []);

    console.log("stores", storesState);
    return (        
        <Map
            id="storeLocations"
            style={{ width: 800, height: 600 }}
            initialViewState={{
                latitude: 19.2056557,
                longitude: 72.818602,
                zoom: 13
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {
                storesState && storesState.stores && storesState.stores.map((stores, i) => {
                    return (
                        <div key={stores._id} >
                            <Marker longitude={stores.location.coordinates[0]} latitude={stores.location.coordinates[1]} color="red" />
                            <>
                                {
                                    showPopup && (
                                        <Popup
                                            longitude={stores.location.coordinates[0]}
                                            latitude={stores.location.coordinates[1]}
                                            anchor="right"
                                            onClose={() => setShowPopup(false)}>
                                            <div >
                                                {stores.storeId}
                                            </div>
                                        </Popup>
                                    )
                                }
                            </>
                        </div>
                    )
                })
            }
        </Map>
    )
}

export default StoreLocations