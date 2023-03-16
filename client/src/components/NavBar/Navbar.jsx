import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <nav>
            <Link to={'/home'}>
            <button>Home</button>
            </Link>
            <Link to={'/about'}>
            <button>About</button>
            </Link>
            <Link to={'/create'}>
            <button>Create</button>
            </Link>
            <SearchBar/>
        </nav>
    )
}

export default Navbar