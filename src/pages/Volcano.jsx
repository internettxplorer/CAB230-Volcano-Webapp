import { useNavigate, useLoaderData } from "react-router-dom";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import {
    Container,
    Box,
    Group,
    Grid,
    Title,
    Text,
    Space,
    Button,
} from "@mantine/core";

import BarGraph from "../components/BarGraph";

/**
 * @desc Displays information about a single volcano with accompanying map marker
 * 
 * @todo error handling
 * @todo map styling, sizing, etc.
 */
export default function Volcano({ loggedIn, setLoggedIn }) {
    const volcano = useLoaderData();
    const navigate = useNavigate();

    const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const latitude = parseFloat(volcano.latitude);
    const longitude = parseFloat(volcano.longitude);

    // Render bar graph if user is logged in
    function loadGraphElement() {
        if (loggedIn) {
            return (
                <BarGraph />
            );
        }
        else {
            setLoggedIn(false);
            return (
            
                <Text size="xl">Log in to see population graph</Text>
            );
        }

    }

    return (
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Button 
                onClick={() => navigate('/list')}
                variant="outline"
                size="md"
                color="orange"
            >
                Back to database
            </Button>

            <Grid>
                <Grid.Col span={6}>
                    <Box>
                        <Title order={3} size="25" mt="30" mb="20" 
                            style={{ fontFamily: "Bilthers", textWrap: "pretty", lineHeight: 2.8, color: "orange" }}>
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
                        {loadGraphElement()}
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
    );
}

Volcano.propTypes = {
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func
}