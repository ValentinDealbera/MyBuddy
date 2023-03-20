import { Link } from "react-router-dom"
import styles from "./Landing.module.css"

const Landing = () => {
    return (
        <div className={styles.back}>
            <div className={styles.image}>
                <div className={styles.textBox}>
                    <div className={styles.text}>
            <h1>Welcome to MyBuddy™</h1>
            <h3>Looking for a friend?</h3>
            <h3>Search or create your ideal buddy!</h3>
            <Link to={"/home"}>
            <button className={styles.button}>Go now!</button>
            </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing