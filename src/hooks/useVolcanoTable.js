import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

/**
 * Query list of volcanoes in a given country (user selection), supports optional populationWithin input
 */
function getVolcanoesByQuery(query) {
    // const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;
    const requestUrl = getUrl(query);

    return fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    return redirect('/fetch-error');
                }
                return response.json();
            })
    // if (query.populatedWithin !== "null") {
    //     return fetch(`${VOLCANO_API_URL}/volcanoes?country=${query.country}&populatedWithin=${query.populatedWithin}`)
    //         .then(response => {
    //             if(!response.ok) {
    //                 return redirect('/fetch-error');
    //             }
    //             return response.json();
    //         })
    // }

    // return fetch(`${VOLCANO_API_URL}/volcanoes?country=${query.country}`)
    // .then(response => {
    //     if(!response.ok) {
    //         return redirect('/fetch-error');
    //     }
    //     return response.json();
    // })
}

/**
 * Provides a URL to query volcanos by user-selected country and (optional) populated-within range
 * 
 * @param {*} q - Object containing country and (optional) populated-within user search
 * @returns {string} Returns URL for fetch request with search terms inserted
 */
function getUrl(q) {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;

    if (q.populatedWithin !== "null") {
        const url = `${VOLCANO_API_URL}/volcanoes?country=${q.country}&populatedWithin=${q.populatedWithin}`;
        return url;
    }
    else {
        const url = `${VOLCANO_API_URL}/volcanoes?country=${q.country}`;
        return url;
    }
}

/**
 *  Returns rowData to populate volcano table
 * 
 * @param {*} search - Object containing country and (optional) populated-within user search
 */
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

