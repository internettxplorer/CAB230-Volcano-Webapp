import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Select from "react-select";
// import {
//     Select,
//     Box,
//     Container,
//     Group,
// } from "@mantine/core";

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
    const [ selection, setSelection ] = useState();

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

    return (
        // <Container size="110rem" style={{ paddingTop: 20 }}>
        //     <Group>
        //         <Select
        //             label="Country"
        //             placeholder="Type or use the dropdown to search"
        //             data={countries}
        //             searchValue={selection}
        //             onSearchChange={setSelection}
        //             searchable
        //         />
        //     </Group>

        // </Container>
        <div
            // style={{ display:"flex" }}
        >
            <Select 
                id="country-select"
                onChange={(selected) => setSelection(selected.value)}
                options={countries}
                placeholder={"Start typing to search..."}
            />
            <button
                id="search-button"
                type="button"
                onClick={() => props.onSubmit(selection)}
            >
                Search
            </button>
        </div>
    )
}

SelectSearch.propTypes = {
    onSubmit: PropTypes.func
}

