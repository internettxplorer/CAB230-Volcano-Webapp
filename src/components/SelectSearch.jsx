
import { useState, useEffect } from "react";
import Select from "react-select";

export default function SelectSearch() {

    const [ countries, setCountries ] = useState([]);

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
        <div>
            <Select options={countries} />
        </div>
    )
}

