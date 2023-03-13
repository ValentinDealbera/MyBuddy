import {
  GET_ALLDOGS,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_RACE,
  ORDER_DOGS,
} from "./actions";

const initialState = {
  allDogs: [],
  filteredDogs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLDOGS:
      return {
        ...state,
        allDogs: action.payload,
        filteredDogs: action.payload,
      };
    case FILTER_BY_TEMPERAMENTS:
      state.filteredDogs = state.allDogs;
      const filteredArray = state.filteredDogs.filter((e) =>
        e.temperament.includes(action.payload)
      );
      return {
        ...state,
        filteredDogs: filteredArray,
      };
    case FILTER_BY_RACE:
      state.filteredDogs = state.allDogs;
      const filteredRaceArray = state.filteredDogs.filter((e) =>
        e.temperament.includes(action.payload)
      );
      return {
        ...state,
        filteredDogs: filteredRaceArray,
      };
    case ORDER_DOGS:
      state.filteredDogs = state.allDogs;
      return {
        ...state,
        filteredDogs:
          action.payload.toLowerCase() === "ascendente"
            ? state.myFavorites.sort((a, b) => a.name - b.name)
            : state.myFavorites.sort((a, b) => b.name - a.name),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
