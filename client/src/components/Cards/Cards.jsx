import Card from "../Card/Card"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllDogs, filterByTemperaments, orderDogs } from "../../redux/actions"
import styles from './Cards.module.css'

const Cards = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllDogs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const dogsArr = useSelector(state => state.filteredDogs)
    
   return (
       <div className={styles.divGeneral}>
        {
            dogsArr.map(dog=>{
                // const temperament = dog.temperament.split(',').slice(0,5).join(', ')
                // console.log(temperament);
                return (
                    <Card
                    key={dog.id}
                    name={dog.name}
                    id={dog.id}
                    image={dog.image}
                    weight={dog.weight}
                    height={dog.height}
                    temperament={dog.temperament}
                    />
                )
            })
        }
       </div>
   )
}

export default Cards