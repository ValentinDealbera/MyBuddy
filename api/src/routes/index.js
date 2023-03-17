const { Router } = require('express');
const axios = require('axios')
const {Dog, Temperament, conn} = require('../db')
const getAllDogs = require('../controllers/getAllDogs');
const getDogsByName = require('../controllers/getDogsByName');
const getDogsById = require('../controllers/getDogsById');
const getTemperaments = require('../controllers/getTemperaments');
const postNewDog = require('../controllers/postNewDog');


const router = Router();

// Configurar los routers
router.get('/dogs', getAllDogs)

router.get('/dogs/name', getDogsByName)

router.get('/dogs/:idRaza', getDogsById)

router.get('/temperaments', getTemperaments)

router.post('/dogs', postNewDog)

module.exports = router;
