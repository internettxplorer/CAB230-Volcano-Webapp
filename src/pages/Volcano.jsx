import { useNavigate } from "react-router-dom";

export default function Volcano() {
    const navigate= useNavigate();

    return (
        <div>
            <h1>Volcano Information</h1>
            <p>The volcano you selected was:</p>

            <button
                onClick={() => navigate("/")}
            >
            Back
            </button>
        </div>

    );
}