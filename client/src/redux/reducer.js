import {
  GET_ALLDOGS,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_RACE,
  ORDER_DOGS,
  EMPTY_FILTER,
  GET_TEMPERAMENTS
} from "./actions";

const initialState = {
  allDogs: [],
  dogsToFilter: [],
  filteredDogs: [],
  temperaments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLDOGS:
      return {
        ...state,
        allDogs: action.payload,
        filteredDogs: action.payload,
        dogsToFilter: action.payload
      };
    case FILTER_BY_TEMPERAMENTS:
      state.filteredDogs = state.allDogs;
      const filteredArray = action.payload === 'All' ? state.allDogs : state.filteredDogs.filter((e) =>{
        return e.temperament?.includes(action.payload)
      }
      );
      return {
        ...state,
        filteredDogs: filteredArray,
      };
    case FILTER_BY_RACE:
      state.filteredDogs = state.allDogs;
      const filteredRaceArray = state.filteredDogs.filter((e) =>
        e.name.toLowerCase().includes(action.payload)
      );
      return {
        ...state,
        filteredDogs: filteredRaceArray,
      };
    case ORDER_DOGS:
      state.filteredDogs = state.allDogs;
      const sortedArray = action.payload === "ascendente"
      ? state.filteredDogs.sort((a, b) =>
      a.name.localeCompare(b.name))
      : state.filteredDogs.sort((a, b) =>
      b.name.localeCompare(a.name));
      return {
        ...state,
        filteredDogs: sortedArray
      };
    case EMPTY_FILTER:
      return {
        ...state,
        filteredDogs: []
      }
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
