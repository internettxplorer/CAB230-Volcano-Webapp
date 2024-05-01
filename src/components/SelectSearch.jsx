import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { useForm } from "@mantine/form";
import {
    Select,
    Container,
    Stack,
    Button,
} from "@mantine/core";

/** 
 *  Searchable select widget for volcanoes by country & population-within range using mantine-forms
 * */ 
// eslint-disable-next-line no-unused-vars
export default function SelectSearch({ selected, setSelection }) {
    const url = import.meta.env.VITE_VOLCANO_API_URL;
    const [ countries, setCountries ] = useState([]);

    // Fetch and re-format country list
    useEffect(() => {
        fetch(`${url}/countries`)
            .then(response => {
                if (!response.ok) {
                    redirect('/fetch-error');
                }
                return response.json();
            })
            .then(res =>
                    res.map(country => {
                        return {
                            value: country,
                            label: country
                        };
                    })
            )
            .then(countries => {
                setCountries(countries);
                countries.unshift({value: "null", label: "Please select a country"});
            });
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
            country: "null",
            populatedWithin: "null"
        },
    
        validate: (values) => ({
            // ensure user selects a country
            country:
                values.country === "null" // default value selected
                    ? 'Country required'
                    : values.country === null // user deselected option
                        ? 'Country required'
                        : null,
        }),
    });

    const handleSearch = () => {
        setSelection(searchForm.getValues());
    }

    return (
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 15 }}>
            <form onSubmit={searchForm.onSubmit(handleSearch)}>
                <Stack maw="250" gap="xs">
                    <Select
                        data={countries}
                        onSearchChange={() => {
                            searchForm.getInputProps('country');}}
                        label="Country"
                        placeholder="Type or use the dropdown to search"
                        title="Select country text input"
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
                        title="Select population range dropdown list"
                        allowDeselect={false}                        
                        {...searchForm.getInputProps('populatedWithin')}
                    />
                    <Button type="submit" variant="filled" color="#e68a00" 
                            mt="5" maw="90" title="Submit search button">
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

