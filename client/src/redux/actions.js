import axios from 'axios'
const GET_ALLDOGS = 'GET_ALLDOGS'
const FILTER_BY_TEMPERAMENTS = 'FILTER_BY_TEMPERAMENTS'
const FILTER_BY_RACE = 'FILTER_BY_RACE'
const ORDER_DOGS = 'ORDER_DOGS'

const getAllDogs = () => {
    return async function (dispatch){
        const response = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: GET_ALLDOGS,
            payload: response.data
        })
    }
}

const filterByTemperaments = (temperament) => {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload: temperament,
    }
}

const filterByRace = (race) => {
    return {
        type: FILTER_BY_RACE,
        payload: race
    }
}

const orderDogs = (id) => {
    return {
        type: ORDER_DOGS,
        payload: id
    }
}

export {
    GET_ALLDOGS,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_RACE,
    ORDER_DOGS,
    getAllDogs,
    filterByTemperaments,
    filterByRace,
    orderDogs
}