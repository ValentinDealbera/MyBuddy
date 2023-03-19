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
    return () => {dispatch(emptyFilter())}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const [filter, setFilter] = useState('All')
  const [tempfilter, setTempFilter] = useState([])
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  let alldogs = props.filteredDogs
  useEffect(()=>{
    setCurrentPage(1)
    dispatch(filterByTemperaments('All'))
    for (let i = 0; i < tempfilter.length; i++) {
      dispatch(filterByTemperaments(tempfilter[i]))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tempfilter])
  const mapDogs = () => {
    if (filter === 'All') {
      alldogs = props.filteredDogs
      return alldogs.map((dog) => {
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
    }
    if (filter === 'Created') {
      const dogsToShow = alldogs.filter(e=>typeof e.id === 'string')
      alldogs = dogsToShow
      return dogsToShow.map((dog) => {
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
    }
    if (filter === 'Default') {
      const dogsToShow = alldogs.filter(e=>typeof e.id === 'number')
      alldogs = dogsToShow
      return dogsToShow.map((dog) => {
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
    }
  };
  const currentCards = mapDogs().slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = ['<'];
  for ( let i = 1; i <= Math.ceil(alldogs.length / cardsPerPage); i++ ) {
    if (i === Math.ceil(alldogs.length / cardsPerPage)) {
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
    setCurrentPage(1)
    setTempFilter([...tempfilter, event.target.value]);
    event.target.value = 'All'
  };
  const orderHandler = (event) => {
    dispatch(emptyFilter());
    dispatch(orderDogs(event.target.value));
  };
  const mapTemperaments = () => {
    return props.temperaments.filter(e=> !tempfilter.includes(e.name)).map((e, i) => {
      return (
        <option key={i} value={e.name}>
          {e.name}
        </option>
      );
    })
  };
  const generalFilter = (event) => {
    setCurrentPage(1)
    setFilter(event.target.value)
  }
  const eliminateTemp = (event) => {
    setCurrentPage(1)
    setTempFilter(tempfilter.filter(e=>e !== event.target.value))
  }
  return (
    <div>
      <div>
      <select defaultValue="All" onChange={filterHandler}>
        <option disabled value="All">Select a temperament</option>
        {mapTemperaments()}
      </select>
      <h5>{tempfilter.map((e,i)=>{
        return (
          <div key={i}>
            <span>{e}</span>
            <button value={e} onClick={eliminateTemp} >x</button>
          </div>
        )
      })}</h5>
      <select onChange={orderHandler}>
        <option value="ascendente">A - Z</option>
        <option value="descendente">Z - A</option>
      </select>
      <select onChange={generalFilter}>
        <option value="All">All</option>
        <option value="Created">Created</option>
        <option value="Default">Default</option>
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