import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
// import Select from "react-select";
import { useForm } from "@mantine/form";
import {
    Select,
    Container,
    Group,
    Title,
    Space,
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
export default function SelectSearch(props) {
    const [ countries, setCountries ] = useState([]);

    // refactor into its own hook? useCountries();
    useEffect(() => {
        fetch("http://4.237.58.241:3000/countries") // change to ref env api url
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
            populatedWithin: null
        },
    
        // ADD validate as needed
    });

    const handleSearch = () => {
        const searchTerms = searchForm.getValues();
        // console.log(searchTerms);

        props.onSubmit(searchTerms.country);
        console.log(searchTerms);
    }

    return (
        <Container size="110rem" style={{ paddingTop: 20 }}>
            <Title order={4} size="40" mt="10" style={{ fontFamily: "Kayak Sans Bold" }}>
                Search the database
            </Title>
            <Space h="lg" />
            <form onSubmit={searchForm.onSubmit(handleSearch)}>
                <Group>
                    <Select
                        label="Country"
                        placeholder="Type or use the dropdown to search"
                        data={countries}
                        // onChange={(selected) => setSelection(selected.value)}
                        // searchValue={selection}
                        // onOptionSubmit={(selected) => {
                        //     setSelection(selected)
                        // }}
                        // onSearchChange={setSelection}
                        searchable
                        withAsterisk
                        selectFirstOptionOnChange
                        {...searchForm.getInputProps('country')}
                    />
                    <Select 
                        label="Populated within"
                        placeholder="Select range"
                        data={populationRanges}
                        // value={range}
                        // onOptionSubmit={setRange}
                        {...searchForm.getInputProps('populatedWithin')}
                    />
                    <Button
                        type="submit"
                        variant="filled"
                        color="#e68a00"
                        mt="20"
                        // onClick={() => props.onSubmit(selection)}
                    >
                        Search
                    </Button>
                </Group>
            </form>


        </Container>
        // <div
        //     // style={{ display:"flex" }}
        // >
        //     <Select 
        //         id="country-select"
        //         onChange={(selected) => setSelection(selected.value)}
        //         options={countries}
        //         placeholder={"Start typing to search..."}
        //     />
        //     <button
        //         id="search-button"
        //         type="button"
        //         onClick={() => props.onSubmit(selection)}
        //     >
        //         Search
        //     </button>
        // </div>
    )
}

SelectSearch.propTypes = {
    onSubmit: PropTypes.func
}

