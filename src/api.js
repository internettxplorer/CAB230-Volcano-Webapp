import { useState, useEffect } from "react";

/**
 * @desc Query API to populate volcano data table
 * 
 * @todo error catching
 * @todo conditional query (accommodating population search)
 */

function getVolcanoesByQuery(query) {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;
    
    return fetch(`${VOLCANO_API_URL}/volcanoes?country=${query}`)
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

