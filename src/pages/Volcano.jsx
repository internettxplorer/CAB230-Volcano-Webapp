import { useNavigate, useLoaderData } from "react-router-dom";

// *** DELETE placeholder function
// export default function Volcano() {
//     const navigate = useNavigate();
//     return (
//         <div>
//             <h1>magic</h1>
//         <button
//         onClick={() => navigate("/list")}
//         >
//             Back
//         </button>
//         </div>
// );
// }

export default function Volcano() {
    const navigate = useNavigate();
    const volcano = useLoaderData();

    return (
        <div>
            <h1>Volcano Information</h1>
            <h2>{volcano.name}</h2>
            <p>Country: {volcano.country}</p>
            <p>Region: {volcano.region}</p>
            <p>Subregion: {volcano.subregion}</p>
            <p>Last Eruption: {volcano.last_eruption}</p>
            <p>Summit: {volcano.summit}</p>
            <p>Elevation: {volcano.elevation}</p>
            <button
                onClick={() => navigate("/list")}
            >
            Back
            </button>
        </div>

    );
}

