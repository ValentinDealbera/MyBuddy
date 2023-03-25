import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from './Detail.module.css'
import axios from "axios"
import { useDispatch } from "react-redux"
import { emptyFilter, getAllDogs } from "../../redux/actions"

const Detail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {idRaza} = useParams() 
    const [dog, setDog] = useState({})
    useEffect(()=>{
        axios.get('/dogs/' + idRaza)
        .then(response=>response.data)
        .then(data=>{
          setDog(data[0])
            console.log(dog);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const deleteHandler = () => {
        axios.delete('/dogs/' + idRaza)
        .then(response => response.data).then(data=> dispatch(emptyFilter())).then(data=>dispatch(getAllDogs())).then(navigate('/home')).catch(error=> console.log(error.message))
        navigate('/home')
    }
    return (
        <div className={styles.card}>
          <div className={styles.textbox}>
            <h1 className={styles.name}>{dog?.name}</h1>
            <h3 className={styles.height}>Height: {dog?.height} cm</h3>
            <h3 className={styles.weight}>Weight: {dog?.weight} kg</h3>
            <h3 className={styles.lifeSpan}>Life span: {dog?.life_span}</h3>
            <h2 className={styles.temp}>temperament</h2>
            <div className={dog?.temperament?.length <= 3 ? styles.tempGridFew : styles.tempGridMuch}>
            {dog?.temperament?.map(e=><button className={styles.tempButton} key={e}>{e}</button>)}
            </div >
            <button className={idRaza.length > 4 ? styles.deleteButton : styles.showNone} onClick={deleteHandler} >🗑️</button>
            <Link to={'/home'}>
            <button className={styles.button}>Home</button>
            </Link>
          </div>
            <img className={styles.img} src={dog?.image} alt="" />
        </div>
    )
}

export default Detail