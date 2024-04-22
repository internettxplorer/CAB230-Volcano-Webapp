import {
    Container,
    Space,
    Title,
} from "@mantine/core";

export default function Home() {
    return (
        <Container size="112rem" mt="180">
            <Title order={1} size="105" style={{color: "#e68a00", fontFamily: "Bilthers, sans-serif"}}>Volcaneer</Title>
            <Space h="60" />
            <Title order={3} size="50" ml="70" mt="10" style={{ fontFamily: "Kayak Sans Bold, sans-serif" }}>
            Explore the world&apos;s volcanoes
            </Title>
            
            {/* <Text mt="80" ml="50">Learn about the world&apos;s volcanoes!</Text> */}
        </Container>
    );
}
