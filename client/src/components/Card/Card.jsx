import styles from "./Card.module.css"

const Card = (props) => {
  return (
      <div className={styles.styleCard}>
        <h4>{props.name}</h4>
        <img className={styles.img} src={props.image} alt={props.name} />
        <p >{props.weight} kg.</p>
        <p className={styles.temperament} >{props.temperament?.split(',').slice(0,4).join(', ')}</p>
      </div>
  )
}

export default Card