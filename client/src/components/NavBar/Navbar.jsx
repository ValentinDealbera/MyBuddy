import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
        <div>
        <h1>MyBuddy</h1>
        </div>
      <nav>
        <Link to={"/home"}>
          <button>Home</button>
        </Link>
        <Link to={"/about"}>
          <button>About</button>
        </Link>
        <Link to={"/create"}>
          <button>Create</button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
