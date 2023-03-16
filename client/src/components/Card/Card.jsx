import styles from "./Card.module.css"
import { Link } from "react-router-dom";


const Card = (props) => {
  return (
      <div className={styles.styleCard}>
        <h4>{props.name}</h4>
        <Link to={`/detail/${props.id}`}>
        <img className={styles.img} src={props.image} alt={props.name} />
        </Link>
        <p >{props.weight} kg.</p>
        <p className={styles.temperament} >{props.temperament?.split(',').slice(0,4).join(', ')}</p>
      </div>
  )
}

export default Card