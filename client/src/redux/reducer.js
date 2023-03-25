import {
  GET_ALLDOGS,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_RACE,
  ORDER_DOGS,
  EMPTY_FILTER,
  GET_TEMPERAMENTS,
  ORDER_BY_WEIGHT

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
      state.filteredDogs = state.dogsToFilter;
      const filteredArray = action.payload === 'All' ? state.allDogs : state.filteredDogs.filter((e) =>{
        return e.temperament?.includes(action.payload)
      }
      );
      return {
        ...state,
        filteredDogs: filteredArray,
        dogsToFilter: filteredArray,
      };
    case FILTER_BY_RACE:
      state.filteredDogs = state.allDogs;
      const filteredRaceArray = state.filteredDogs.filter((e) =>
        e.name.toLowerCase().includes(action.payload.toString())
      );
      return {
        ...state,
        filteredDogs: filteredRaceArray,
        dogsToFilter: filteredRaceArray,
      };
    case ORDER_DOGS:
      state.filteredDogs = state.dogsToFilter;
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
    case ORDER_BY_WEIGHT:
      state.filteredDogs = state.dogsToFilter;
      const sortedByWeight = action.payload === "ascendente"
      ? state.dogsToFilter.sort((a, b) => {
        if (parseInt(a.weight[0] + a.weight[1]) > parseInt(b.weight[0] + b.weight[1])) {
          return 1;
        }
        if (parseInt(b.weight[0] + b.weight[1]) > parseInt(a.weight[0] + a.weight[1])) {
          return -1;
        }
        return 0;
      })
    : state.dogsToFilter.sort((a, b) => {
        if (parseInt(a.weight[0] + a.weight[1]) > parseInt(b.weight[0] + b.weight[1])) {
          return -1;
        }
        if (parseInt(b.weight[0] + b.weight[1]) > parseInt(a.weight[0] + a.weight[1])) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        filteredDogs: sortedByWeight
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
