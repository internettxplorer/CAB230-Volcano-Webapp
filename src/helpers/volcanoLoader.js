import { redirect } from "react-router-dom";
import { checkUserLoggedIn } from "./checkUserLoggedIn";

/** 
 * @desc Loads individual volcano info based on row click and user auth state
 * 
 * @todo error catching w/ UI potentially
 * @todo refactor into helper function -> checkUserLoggedIn() return: bool
*/
export function volcanoLoader(id) {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;
    const url = `${VOLCANO_API_URL}/volcano/${id}`;
    const userLoggedIn = checkUserLoggedIn();

    // Makes fetch request for volcano info with or without token auth, if it exists
    if (userLoggedIn) {
        const token = localStorage.getItem("token");

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }) 
            .then(response => {
                if (!response.ok) {
                    return redirect('/fetch-error');
                    // throw new Error('Fetch not successful'); // CHANGE to redirect error page?
                }
                return response.json();
        })
    }
    else if (userLoggedIn === false) {
        return fetch(url)
            .then(response => {
                if(!response.ok) {
                    return redirect('/fetch-error');
                }
                return response.json();
        })
    }
    else {
        return redirect('/fetch-error');
    }
}