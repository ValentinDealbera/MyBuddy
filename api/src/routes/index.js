const { Router } = require('express');
const axios = require('axios')
const {Dog} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get('/dogs', async (req, res)=>{
    try {
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll()
        res.status(200).json([...dogsApi.data, ...dataBaseDogs])
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/dogs/:idRaza', async (req, res)=>{
    try {
        const {idRaza} = req.params
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll()
        const allDogs = [...dogsApi.data, ...dataBaseDogs]
        const specificDog = allDogs.filter(e=>e.id === Number(idRaza))
        res.status(200).json(specificDog)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


module.exports = router;
