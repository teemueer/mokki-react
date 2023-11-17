import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
    return (
        <nav className="navbar">
            <Link to="/">Mökki</Link>
        </nav>
    );
};

export default Navigation;
