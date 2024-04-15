
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Select from "react-select";

/** 
 *  @desc Searchable dropdown list of countries using react-select
 * 
 * @todo search functionality
 * @todo error catching
 * @todo styling
 *  
 * */ 
export default function SelectSearch(props) {
    const [ countries, setCountries ] = useState([]);
    const [ selection, setSelection ] = useState('Ecuador');

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
        <div
            // style={{ display:"flex" }}
        >
            <Select 
                id="search-select"
                value={selection}
                onChange={(selected) => setSelection(selected.value)}
                options={countries}
                width={"200px"}
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
    onSubmit: PropTypes.onSubmit
}

