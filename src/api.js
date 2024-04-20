import { useState, useEffect } from "react";

/**
 * @desc Query API to populate volcano data table
 * 
 * @todo error catching
 * @todo conditional query (accommodating population search)
 */

function getVolcanoesByQuery(query) {
    return fetch(`http://4.237.58.241:3000/volcanoes?country=${query}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export function useVolcanoTable(search) {
    const [ rowData, setRowData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        getVolcanoesByQuery(search)
            .then(volcanoes => {
                setRowData(volcanoes);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
        
    }, [search]);

    return {
        rowData,
        loading,
        error
    }
}

