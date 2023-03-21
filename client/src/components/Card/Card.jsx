import styles from "./Card.module.css"
import { Link } from "react-router-dom";


const Card = (props) => {
  return (
      <div className={styles.card}>
        <div className={styles.image}>
        <Link to={`/detail/${props.id}`}>
        <img className={styles.img} src={props.image} alt={props.name} />
        </Link>
        </div>
        <div className={styles.name}>
        <p className={styles.nameString}>{props.name}</p>
        </div>
        <div className={styles.weight}>
        <p className={styles.weightNumber}>{props.weight} kg.</p>
        </div>
        <div className={styles.temp}>
        {props.temperament?.split(',').slice(0,4).map((e,i)=> <button className={styles.tempButtons} key={i}>{e}</button>)}
        </div>
      </div>
  )
}

export default Card