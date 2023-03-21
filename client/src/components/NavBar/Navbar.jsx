import { Link } from "react-router-dom";
import styles from './Navbar.module.css'
import foto from '../../utils/dogologo-removebg-preview.png'
const Navbar = () => {
  return (
    <div>
        <div className={styles.banner}>
        <Link to={"/home"}>
          <img className={styles.image} src={foto} alt="Logo" />
        </Link>
        <h1>MyBuddy</h1>
        </div>
      <nav className={styles.navbar}>
        <Link to={"/home"}>
          <button className={styles.navbarButton}>Home</button>
        </Link>
        <Link to={"/about"}>
          <button className={styles.navbarButton}>About</button>
        </Link>
        <Link to={"/create"}>
          <button className={styles.navbarButton}>Create</button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
