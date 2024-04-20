import { useNavigate, useLoaderData } from "react-router-dom";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import "../styles/volcano.css";

/**
 * @desc Displays information about a single volcano with accompanying map marker
 * 
 * @todo error handling
 * @todo map styling, sizing, etc.
 */
export default function Volcano() {
    const navigate = useNavigate();
    const volcano = useLoaderData();
    const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const latitude = parseFloat(volcano.latitude);
    const longitude = parseFloat(volcano.longitude);
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

            <button
                onClick={() => navigate("/list")}
            >
            Back
            </button>

        </div>

    );
}

