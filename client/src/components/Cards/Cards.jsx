import Card from "../Card/Card";
import { connect, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  emptyFilter,
  filterByTemperaments,
  orderDogs,
  getAllDogs,
  getTemperaments,
} from "../../redux/actions";
import styles from "./Cards.module.css";

const Cards = (props) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTemperaments())
    dispatch(getAllDogs())
    dispatch(emptyFilter())
    dispatch(filterByTemperaments("All"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
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
  const currentCards = mapDogs().slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = ['<'];
  for ( let i = 1; i <= Math.ceil(props.filteredDogs.length / cardsPerPage); i++ ) {
    if (i === Math.ceil(props.filteredDogs.length / cardsPerPage)) {
      pageNumbers.push(i);
      pageNumbers.push('>')
      break;
    }
    pageNumbers.push(i);
  }
  const handleClick = (event) => {
    if (event.target.id === '>'){
      if (currentPage >= pageNumbers.length-2){
        return setCurrentPage(pageNumbers.length-2)
      }
      return setCurrentPage(Number(currentPage) + Number(1))
    }
    if (event.target.id === '<'){
      if (currentPage <= 1){
        return setCurrentPage(1)
      }
      return setCurrentPage(Number(currentPage) - Number(1))
    }
    setCurrentPage(event.target.id);
  };
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        className={styles.list}
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </button>
    );
  });
  const filterHandler = (event) => {
    dispatch(emptyFilter());
    dispatch(filterByTemperaments(event.target.value));
  };
  const orderHandler = (event) => {
    dispatch(emptyFilter());
    dispatch(orderDogs(event.target.value));
  };
  const mapTemperaments = () => {
    return props.temperaments.map((e, i) => {
      return (
        <option key={i} value={e.name}>
          {e.name}
        </option>
      );
    });
  };
  return (
    <div>
      <div>
      <select defaultValue="All" onChange={filterHandler}>
        <option value="All">All</option>
        {mapTemperaments()}
      </select>
      <select onChange={orderHandler}>
        <option value="ascendente">A - Z</option>
        <option value="descendente">Z - A</option>
      </select>
      </div>
      <div className={styles.divGeneral}>{currentCards}</div>
      <div>{renderPageNumbers}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filteredDogs: state.filteredDogs,
    temperaments: state.temperaments,
  };
}

export default connect(mapStateToProps, null)(Cards);
