import { Box, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import PropTypes from 'prop-types';
import { useLoaderData } from "react-router-dom";
import { checkLoggedIn } from "../helpers/UserAuth";

/**
 * @desc Conditionally renders bar graph with population density info if user is logged in
 * 
 * @todo ...
 */
export default function BarGraph() { // put in separate file BarGraph.jsx
    const volcano = useLoaderData();

    // BarGraph({ isLoggedIn })
    // console.log(checkLoggedIn()); // DELETE
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
                data={populationData} // replace later
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