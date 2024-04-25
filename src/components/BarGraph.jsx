import { Box, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import PropTypes from 'prop-types';
import { useLoaderData } from "react-router-dom";

/**
 * @desc Display bar graph with population data (given if user logged in)
 */
export default function BarGraph() {
    const volcano = useLoaderData();
    const populationData = [
        {range: "5 km", density: volcano.population_5km},
        {range: "10 km", density: volcano.population_10km},
        {range: "30 km", density: volcano.population_30km},
        {range: "100 km", density: volcano.population_100km},
    ]

    return (
        <Box maw={700} ml={100}>
            <Text size="lg" mb="md" ml="md">
                Population density near this volcano
            </Text>
            <BarChart 
                h={300}
                data={populationData}
                dataKey="range"
                xAxisLabel="Distance from volcano"
                valueFormatter={(value) => new Intl.NumberFormat('en-AU').format(value)}
                unit=" people"
                barChartProps={{ width: '350' }}
                xAxisProps={{ padding: { left: 30 } }}
                series={[
                    { name: 'density', color: 'orange' }
                ]}
            />
        </Box>
    );
}

BarGraph.propTypes = {
    isLoggedIn: PropTypes.bool
}