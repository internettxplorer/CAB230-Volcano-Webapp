// export function volcanoLoader({ params }) {
//     return fetch(`http://4.237.58.241:3000/volcano/${params.id}`)
//         .then(response => {
//             if(!response.ok) {
//                 throw new Error('Fetch not successful');
//             }
//             return response.json();
//         })
// }

// export const volcanoLoader = ({ params }) => {
//     return fetch(`http://4.237.58.241:3000/volcano/${params.id}`)
//         .then(response => {
//             if(!response.ok) {
//                 throw new Error('Fetch not successful');
//             }
//             return response.json();
//         })
// }

export const volcanoLoader = async ({ params }) => {
    const query = await fetch(`http://4.237.58.241:3000/volcano/${params.id}`);
    const response = await query.json();

    return response;
}