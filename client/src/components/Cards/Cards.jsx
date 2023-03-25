import Card from "../Card/Card";
import { connect, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  emptyFilter,
  filterByTemperaments,
  orderDogs,
  orderByWeight,
  filterByRace,
} from "../../redux/actions";
import styles from "./Cards.module.css";
import SearchBar from "../SearchBar/SearchBar";
import loading from '../../utils/dog_loader_250x250.gif'

const Cards = (props) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch();
  const [filterBy, setFilterBy] = useState('')
  const [dropdown, setDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const [filter, setFilter] = useState("All");
  const [tempfilter, setTempFilter] = useState([]);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  let alldogs = props.filteredDogs;
  useEffect(() => {
    setCurrentPage(1);
    dispatch(filterByTemperaments("All"));
    for (let i = 0; i < tempfilter.length; i++) {
      dispatch(filterByTemperaments(tempfilter[i]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempfilter]);
  const mapDogs = () => {
    if (filter === "All") {
      alldogs = props.filteredDogs;
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
    if (filter === "Created") {
      const dogsToShow = alldogs.filter((e) => typeof e.id === "string");
      alldogs = dogsToShow;
      
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
    if (filter === "Default") {
      const dogsToShow = alldogs.filter((e) => typeof e.id === "number");
      alldogs = dogsToShow;
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
  useEffect(()=>{
    if(alldogs.length > 0) setShow(true)
    if(alldogs.length === 0) setShow(false)
  },[alldogs])
  const pageNumbers = ["<"];
  for (let i = 1; i <= Math.ceil(alldogs.length / cardsPerPage); i++) {
    if (i === Math.ceil(alldogs.length / cardsPerPage)) {
      pageNumbers.push(i);
      pageNumbers.push(">");
      break;
    }
    pageNumbers.push(i);
  }
  const handleClick = (event) => {
    if (event.target.id === ">") {
      if (currentPage >= pageNumbers.length - 2) {
        return setCurrentPage(pageNumbers.length - 2);
      }
      return setCurrentPage(Number(currentPage) + Number(1));
    }
    if (event.target.id === "<") {
      if (currentPage <= 1) {
        return setCurrentPage(1);
      }
      return setCurrentPage(Number(currentPage) - Number(1));
    }
    setCurrentPage(event.target.id);
  };
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button     
        className={styles.paginate}
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </button>
    );
  });
  const filterHandler = (event) => {
    setCurrentPage(1);
    setTempFilter([...tempfilter, event.target.value]);
    event.target.value = "All";
  };
  const orderHandler = (event) => {
    if (filterBy === 'weight') {
      dispatch(emptyFilter());
   return dispatch(orderByWeight(event.target.value));
    }
    dispatch(emptyFilter());
    dispatch(orderDogs(event.target.value));
  };
  const mapTemperaments = () => {
    return props.temperaments
      .filter((e) => !tempfilter.includes(e.name))
      .map((e, i) => {
        return (
          <option key={i} value={e.name}>
            {e.name}
          </option>
        );
      });
  };
  const generalFilter = (event) => {
    setCurrentPage(1);
    setFilter(event.target.value);
  };
  const eliminateTemp = (event) => {
    setCurrentPage(1);
    setTempFilter(tempfilter.filter((e) => e !== event.target.value));
  };
  const filterByHandler = (event) => {
    setFilterBy(event.target.value)
    orderHandler(event)
  }
  const errorHandler = () => {
    dispatch(emptyFilter());
      dispatch(filterByRace(''));
  }
  useEffect(() => {
    if (filterBy === 'weight') {
      dispatch(emptyFilter());
      dispatch(orderByWeight("ascendente"));
    }
    else {
      dispatch(emptyFilter());
      dispatch(orderDogs("ascendente"));}
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);
  return (
    <div className={!show ? styles.loading : undefined}>
      <div  className={show ? styles.done : undefined} >
      <img src={loading} alt="Loading" />
      <button className={styles.errorButton}  onClick={errorHandler}>Home</button>
      </div>
    <div className={!show ? styles.hide : undefined}>
      <div className={styles.filterBar}>
        <div className={styles.tempBar}>
          <button
            onClick={() => {
              dropdown ? setDropdown(false) : setDropdown(true);
            }}
            className={dropdown ? styles.tempButtonOn : styles.tempButtonOff}
          >
            Filter by temperament
          </button>
          {dropdown && (
            <div className={styles.select}>
              <select
                className={styles.selectBar}
                defaultValue="All"
                onChange={filterHandler}
              >
                <option disabled value="All">
                  Select a temperament
                </option>
                {mapTemperaments()}
              </select>
              <div className={styles.insideTempBar}>
                {tempfilter.map((e, i) => {
                  return (
                    <div key={i}>
                      <button
                        className={styles.tempBarButton}
                        value={e}
                        onClick={eliminateTemp}
                      >
                        {e}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className={styles.searchBar}>
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>
        <div className={styles.filterCards}>
          <label>by: </label>
          <input
          onClick={filterByHandler} 
            type="radio"
            id="alphabetically"
            name="fav_language"
            value="alphabetically"
            defaultChecked
          />
          <label>Alphabetically</label>
          <input onClick={filterByHandler} type="radio" id="weight" name="fav_language" value="weight" />
          <label>Weight</label>
          <select onChange={orderHandler}>
            <option value="ascendente">Ascendent</option>
            <option value="descendente">Descendent</option>
          </select>
          <label>From: </label>
          <select onChange={generalFilter}>
            <option value="All">All</option>
            <option value="Created">Created</option>
            <option value="Default">Default</option>
          </select>
        </div>
      </div>
      <div className={styles.divGeneral}>{currentCards}</div>
      <div className={styles.paginate}>{renderPageNumbers}</div>
    </div>
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
