import { emptyFilter, filterByRace } from "../../redux/actions";
import { useDispatch, connect } from "react-redux";
import { useState } from "react";
const SearchBar = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const searchHandler = () => {
    dispatch(emptyFilter());
    dispatch(filterByRace(search));
  };
  const inputHandler = (event) => {
    setSearch(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(emptyFilter());
      dispatch(filterByRace(search));
    }
  };

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
