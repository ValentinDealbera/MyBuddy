import axios from 'axios'
const GET_ALLDOGS = 'GET_ALLDOGS'
const FILTER_BY_TEMPERAMENTS = 'FILTER_BY_TEMPERAMENTS'
const FILTER_BY_RACE = 'FILTER_BY_RACE'
const ORDER_DOGS = 'ORDER_DOGS'
const EMPTY_FILTER = 'EMPTY_FILTER'
const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT'

const orderByWeight = (id) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload: id
    }
}

const getAllDogs = () => {
    return async function (dispatch){
        const response = await axios.get("/dogs")
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

const emptyFilter = () => {
    return {
        type: EMPTY_FILTER,
    }
}

const getTemperaments = () => {
    return async function (dispatch){
        const response = await axios.get("/temperaments")
        const set = new Set(response.data)
        const arr = Array.from(set)
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: arr
        })
    }
}

export {
    GET_ALLDOGS,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_RACE,
    ORDER_DOGS,
    EMPTY_FILTER,
    GET_TEMPERAMENTS,
    ORDER_BY_WEIGHT,
    getAllDogs,
    filterByTemperaments,
    filterByRace,
    orderDogs,
    emptyFilter,
    getTemperaments,
    orderByWeight
}