import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/list">Volcano List</Link>
                </li>
                <li>
                    <Link to="/login">Sign in</Link>
                </li>
            </ul>
        </nav>
    );
}