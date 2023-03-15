import Card from "../Card/Card";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  emptyFilter,
  getAllDogs,
  filterByTemperaments,
  orderDogs,
  getTemperaments,
} from "../../redux/actions";
import styles from "./Cards.module.css";

const Cards = (props) => {
  const dispatch = useDispatch();
  const filterHandler = (event) => {
    dispatch(emptyFilter())
    dispatch(filterByTemperaments(event.target.value))
  } 
  const orderHandler = (event) => {
    dispatch(emptyFilter())
    dispatch(orderDogs(event.target.value));
  };
  useEffect(() => {
    dispatch(getTemperaments())
    dispatch(getAllDogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mapDogs = () => {
    return props.filteredDogs.map((dog) => {
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
      );
    });
  };
  const mapTemperaments = () => {
    return props.temperaments.map((e, i)=>{
        return (
            <option key={i} value={e.name}>{e.name}</option>
        )
    })
  }
  return (
    <div>
        <select defaultValue="All" onChange={filterHandler}>
            <option value="All" >All</option>
            {
              mapTemperaments()
              }  
        </select>
      <select onChange={orderHandler}>
        <option value="ascendente">A - Z</option>
        <option value="descendente">Z - A</option>
      </select>
      <div className={styles.divGeneral}>
      {mapDogs()}
      </div>
    </div>
  );
};

export function mapStateToProps(state) {
    return {
      filteredDogs: state.filteredDogs,
      temperaments: state.temperaments
    };
  }
  
  export default connect(mapStateToProps, null)(Cards);