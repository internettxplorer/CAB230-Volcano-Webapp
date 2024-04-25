import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useForm } from "@mantine/form";
import {
    Select,
    Container,
    Stack,
    Button,
} from "@mantine/core";

/** 
 *  @desc Searchable dropdown list of countries using react-select
 * 
 * @todo input validation
 * @todo error catching
 * @todo styling
 *  
 * */ 
export default function SelectSearch({ selected, setSelection }) {
    const [ countries, setCountries ] = useState([]);

    // Fetch and re-format country list
    useEffect(() => {
        fetch("http://4.237.58.241:3000/countries")
            .then(response => response.json())
            .then(res =>
                    res.map(country => {
                        return {
                            value: country,
                            label: country
                        };
                    })
            )
            .then(countries => setCountries(countries));
    }, []);

    const populationRanges = [
        { value: "null", label: "Any distance" },
        { value: "5km", label: "5 km"},
        { value: "10km", label: "10 km"},
        { value: "30km", label: "30 km"},
        { value: "100km", label: "100 km"},
    ]

    const searchForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            country: "",
            populatedWithin: "null"
        },
    
        validate: (values) => ({
            country:
                values.country === ""
                    ? 'Country required'
                    : values.country === "null"
                        ? 'Country required'
                        : values.country === null
                            ? 'Country required'
                            : null,
        }),
    });

    const handleSearch = () => {
        setSelection(searchForm.getValues());
        console.log(selected);
    }

    return (
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 15 }}>
            <form onSubmit={searchForm.onSubmit(handleSearch)}>
                <Stack maw="250" gap="xs">
                    <Select
                        data={countries}
                        onOptionSubmit={() => {searchForm.getInputProps('country')}}
                        label="Country"
                        placeholder="Type or use the dropdown to search"
                        searchable
                        withAsterisk
                        selectFirstOptionOnChange
                        {...searchForm.getInputProps('country')}
                    />
                    <Select 
                        data={populationRanges}
                        onOptionSubmit={() => {searchForm.getInputProps('populatedWithin')}}
                        maw="150"
                        label="Populated within"
                        placeholder="Select range"
                        allowDeselect={false}                        
                        {...searchForm.getInputProps('populatedWithin')}
                    />
                    <Button type="submit" variant="filled" color="#e68a00" mt="5" maw="90">
                        Search
                    </Button>
                </Stack>
            </form>
        </Container>
    )
}

SelectSearch.propTypes = {
    selected: PropTypes.object,
    setSelection: PropTypes.func
}

