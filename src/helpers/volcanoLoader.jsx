/** 
 * @desc Loads individual volcano info based on row click and user auth state
 * 
 * @todo error catching w/ UI potentially
*/
export function volcanoLoader(id) {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL; // CHANGE -- maybe refactor to global var
    const url = `${VOLCANO_API_URL}/volcano/${id}`;

    // Makes fetch request for volcano info with or without token auth, if it exists
    if ("token" in localStorage) {
        const token = localStorage.getItem("token");
        console.log("Returning fetch WITH token"); // DELETE

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fetch not successful');
                }
                return response.json();
        })
    }
    else if (!("token" in localStorage)) {
        console.log("Returning fetch WITHOUT token"); // DELETE
        return fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Fetch not successful');
                }
                return response.json();
        })
    }
    else {
        throw new Error('Fetch unsuccessful');
    }
}