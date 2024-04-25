import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

/**
 * @desc Query API to populate volcano data table
 * 
 * @todo error catching
 * @todo conditional query (accommodating population search)
 */

function getVolcanoesByQuery(query) {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;

    if (query.populatedWithin !== "null") {
        return fetch(`${VOLCANO_API_URL}/volcanoes?country=${query.country}&populatedWithin=${query.populatedWithin}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
    }
    else if (query.country === "") {
        return redirect('/');
    }
    else {
        return fetch(`${VOLCANO_API_URL}/volcanoes?country=${query.country}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
    }

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

