import { useNavigate } from "react-router-dom";
import {
    Container,
    Title,
    Button,
} from "@mantine/core";

/**
 *  Error page rendered when user tries to access non-existent route
 */
export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 20, }}>
                <Title order={4} size="40" mt="10" style={{ fontFamily: "Kayak Sans Bold" }}>
                    404 Page Not Found
                </Title>
                <Title order={5} size="30" mt="10" ml="lg" style={{ fontFamily: "Kayak Sans Light" }}>
                    The page you are trying to access does not exist
                </Title>
                <Title order={6} size="28" ml="lg" mb="50" style={{ fontFamily: "Kayak Sans Light"}}>
                    Please go back
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