import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div>
            <h1>esta es una landing page</h1>
            <Link to={"/home"}>
            <button>Home</button>
            </Link>
        </div>
    )
}

export default Landing