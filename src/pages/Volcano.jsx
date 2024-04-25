import { useNavigate, useLoaderData } from "react-router-dom";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import {
    Container,
    Box,
    Group,
    Grid,
    Title,
    Text,
    Space,
    Button, // DELETE
} from "@mantine/core";

import BarGraph from "../components/BarGraph";
import "../styles/volcano.css";

// import { useState } from "react";

/**
 * @desc Displays information about a single volcano with accompanying map marker
 * 
 * @todo error handling
 * @todo map styling, sizing, etc.
 * @todo refactor return into mantine format
 * @todo display pop graph dynamically based on user state
 */
export default function Volcano() {
    
    const volcano = useLoaderData();
    const navigate = useNavigate();

    const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const latitude = parseFloat(volcano.latitude);
    const longitude = parseFloat(volcano.longitude);

    return (
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Button onClick={() => navigate('/list')} variant="outline" size="md">Back to database</Button>
            <Grid>
                <Grid.Col span={6}>
                    <Box>
                        <Title order={3} size="25" mt="30" mb="20" style={{ fontFamily: "Bilthers", textWrap: "pretty", lineHeight: 2.8 }}>
                            {volcano.name}
                        </Title>
                        <Text c="dimmed" size="lg">Country</Text>
                        <Text size="50px" ml="sm">{volcano.country}</Text>

                        <Text c="dimmed" size="lg" mt="sm">Region</Text>
                        <Text size="50px" ml="sm">{volcano.region}</Text>

                        <Text c="dimmed" size="lg" mt="sm">Subregion</Text>
                        <Text size="38px" ml="sm">{volcano.subregion}</Text>

                        <Group justify="flex-start" mt="sm">
                            <Box mr="50px">
                                <Text c="dimmed" size="md" mt="sm">Last eruption</Text>
                                <Text size="35px" ml="sm">{volcano.last_eruption}</Text>
                            </Box>
                            <Box mr="50px">
                                <Text c="dimmed" size="md" mt="sm">Summit</Text>
                                <Text size="35px" ml="sm">{volcano.summit} m</Text>
                            </Box>
                            <Box mr="50px">
                                <Text c="dimmed" size="md" mt="sm">Elevation</Text>
                                <Text size="35px" ml="sm">{volcano.elevation} ft</Text>
                            </Box>
                        </Group>
                        <Space h="50px" />
                        <BarGraph isLoggedIn={true} />
                    </Box>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Box>
                        <Title order={3} size="45px" mt="45" mb="5" style={{ fontFamily: "Kayak Sans Bold" }}>
                                Location
                        </Title>
                        <APIProvider apiKey={MAPS_API_KEY}>
                            <Map 
                                zoom={6} 
                                center={{lat: latitude, lng: longitude}}
                                gestureHandling={'none'} // disable interaction with the map
                                disableDefaultUI={true}
                                style={{width: '855px', height: '75vh', borderRadius: '18px'}}
                            >
                                <Marker position={{lat: latitude, lng: longitude}} />
                            </Map>
                    </APIProvider>
                    </Box>
                </Grid.Col>
            </Grid>
        </Container>
        // <div>
        //     <div className="flex-container">
        //         <div className="flex-child">
        //             <h1>Volcano Information</h1>
        //             <h2>{volcano.name}</h2>
        //             <p>Country: {volcano.country}</p>
        //             <p>Region: {volcano.region}</p>
        //             <p>Subregion: {volcano.subregion}</p>
        //             <p>Last Eruption: {volcano.last_eruption}</p>
        //             <p>Summit: {volcano.summit}</p>
        //             <p>Elevation: {volcano.elevation}</p>
        //         </div>
        //         <div className="flex-child">
        //             <h1>Volcano Location</h1>
                    // <APIProvider apiKey={MAPS_API_KEY}>
                    //     <Map 
                    //         zoom={4} 
                    //         center={{lat: latitude, lng: longitude}}
                    //         gestureHandling={'none'} // disable interaction with the map
                    //         disableDefaultUI={true}
                    //         style={{width: '50vw', height: '75vh'}}
                    //     >
                    //         <Marker position={{lat: latitude, lng: longitude}} />
                    //     </Map>
                    // </APIProvider>
        //         </div>
        //     </div>
        //     <div>
        //         <BarGraph isLoggedIn={true} />
        //     </div>

        //     <button
        //         onClick={() => navigate("/list")}
        //     >
        //     Back
        //     </button>

        // </div>

    );
}

