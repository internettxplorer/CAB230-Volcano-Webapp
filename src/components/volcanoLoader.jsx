/** 
 * @desc Loads individual volcano info based on row click
 * 
 * @todo error catching
*/
export function volcanoLoader(id) {
    return fetch(`http://4.237.58.241:3000/volcano/${id}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Fetch not successful');
            }
            return response.json();
        })
}