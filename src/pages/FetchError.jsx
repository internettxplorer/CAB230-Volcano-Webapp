import { useNavigate } from "react-router-dom";
import {
    Container,
    Title,
    Button,
} from "@mantine/core";

/**
 *  Error page shown when volcano page loader fails fetch request
 */
export default function FetchError() {
    const navigate = useNavigate();
    return (
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 20, }}>
                <Title order={4} size="40" mt="10" style={{ fontFamily: "Kayak Sans Bold" }}>
                    Error fetching volcano data!
                </Title>
                <Title order={5} size="30" mt="10" ml="lg" style={{ fontFamily: "Kayak Sans Light" }}>
                    A problem occurred when retrieving data from the API
                </Title>
                <Title order={6} size="28" ml="lg" mb="50" style={{ fontFamily: "Kayak Sans Light"}}>
                    Please reload the page or try again later.
                </Title>
                <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                    size="md"
                    color="orange"
                >
                    Back to home
                </Button>
        </Container>
    );

}