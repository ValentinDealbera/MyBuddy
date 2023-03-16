import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from './Detail.module.css'
import axios from "axios"

const Detail = () => {
    const {idRaza} = useParams() 
    const [character, setCharacter] = useState({})
    useEffect(()=>{
        axios.get('http://localhost:3001/dogs/' + idRaza)
        .then(response=>response.data)
        .then(data=>{
            setCharacter(data[0])
            console.log(character);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
      <div>
        <div className={styles.detail}>
          <div className={styles.text}>
            <h1>{character?.name}</h1>
            <h3>Height :{character?.height} cm</h3>
            <h3>Weight: {character?.weight} kg</h3>
            <h3>Life span: {character?.life_span}</h3>
            <h4>temperament: {character?.temperament?.map(e=><li key={e}>{e}</li>)}</h4>
            <Link to={'/home'}>
            <button className={styles.button}>Home</button>
            </Link>
          </div>
            <img className={styles.img} src={character?.image} alt="" />
        </div>
      </div>
    )
}

export default Detail