import { useNavigate, useLoaderData } from "react-router-dom";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import BarGraph from "../components/BarGraph";

import "../styles/volcano.css";

// import { useState } from "react";

/**
 * @desc Displays information about a single volcano with accompanying map marker
 * 
 * @todo error handling
 * @todo map styling, sizing, etc.
 */
export default function Volcano() {
    
    const volcano = useLoaderData();
    const navigate = useNavigate();
    // const [ loginState, setLoginState ] = useState(false);

    const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const latitude = parseFloat(volcano.latitude);
    const longitude = parseFloat(volcano.longitude);

    // function checkUserLoggedIn() {
    //     if (localStorage.getItem("token")) {
    //         setLoginState(true);
    //     }
    //     else if (!localStorage.getItem("token")) {
    //         setLoginState(false);
    //     }
    //     else {
    //         setLoginState(false);
    //     }
    // }

    // const checkUserLoggedIn = () => {
    //     if (localStorage.getItem("token")) {
    //         return true;
    //     }
    //     else if (!localStorage.getItem("token")) {
    //         return false;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    return (
        <div>
            <div className="flex-container">
                <div className="flex-child">
                    <h1>Volcano Information</h1>
                    <h2>{volcano.name}</h2>
                    <p>Country: {volcano.country}</p>
                    <p>Region: {volcano.region}</p>
                    <p>Subregion: {volcano.subregion}</p>
                    <p>Last Eruption: {volcano.last_eruption}</p>
                    <p>Summit: {volcano.summit}</p>
                    <p>Elevation: {volcano.elevation}</p>
                </div>
                <div className="flex-child">
                    <h1>Volcano Location</h1>
                    <APIProvider apiKey={MAPS_API_KEY}>
                        <Map 
                            zoom={4} 
                            center={{lat: latitude, lng: longitude}}
                            gestureHandling={'none'} // disable interaction with the map
                            disableDefaultUI={true}
                            style={{width: '50vw', height: '75vh'}}
                        >
                            <Marker position={{lat: latitude, lng: longitude}} />
                        </Map>
                    </APIProvider>
                </div>
            </div>
            <div>
                <BarGraph isLoggedIn={true} />
            </div>

            <button
                onClick={() => navigate("/list")}
            >
            Back
            </button>
            <button
                onClick={() => localStorage.removeItem("token")}
            >
                Logout - REMOVE ME LATER
            </button>

        </div>

    );
}

