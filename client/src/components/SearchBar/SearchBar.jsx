import { emptyFilter, filterByRace } from "../../redux/actions";
import { useDispatch, connect } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
const SearchBar = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const inputHandler = (event) => {
    setSearch(event.target.value);
  };
  useEffect(()=>{
    if (search === ""){
      dispatch(emptyFilter());
      dispatch(filterByRace(search))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search])
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(emptyFilter());
      props.setCurrentPage(1)
      dispatch(filterByRace(search));
    }
  };
  const searchHandler = (event) => {
    dispatch(emptyFilter());
      props.setCurrentPage(1)
      dispatch(filterByRace(search));
  }
  return (
    <div>
      <input
        onKeyDown={handleKeyPress}
        value={search}
        type="text"
        onChange={inputHandler}
      />
      <button onClick={searchHandler}>Search</button>
    </div>
  );
};

export function mapStateToProps(state) {
  return {
    filteredDogs: state.filteredDogs,
    temperaments: state.temperaments,
  };
}

export default connect(mapStateToProps, null)(SearchBar);
