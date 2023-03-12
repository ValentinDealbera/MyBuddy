const { Router } = require('express');
const axios = require('axios')
const {Dog, Temperament, conn} = require('../db')
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

router.get('/dogs/name', async (req, res)=>{
    try {
        const {name} = req.query
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll()
        const allDogs = [...dogsApi.data, ...dataBaseDogs]
        const specificDog = allDogs.filter(e=>e.name.toLowerCase().includes(name))
        console.log(name);
        res.status(200).json(specificDog)
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
        console.log(idRaza);
        res.status(200).json(specificDog)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/temperaments', async (req, res)=>{
    try {
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        let arr = []
        const aux = dogsApi.data.map(e=>{
            return e.temperament + ''
        }).map(e=>{
            return e.split(',')
        })
        for (let i = 0; i < aux.length; i++) {
            for (let x = 0; x < aux[i].length; x++) {
                aux[i][x]
                arr.push(aux[i][x])
            }
        }
        const set = new Set(arr)
        const finalArr = Array.from(set).map(e=>e.trim()).map(element=>{
            return {
                name: element
            }
        })
        await Temperament.bulkCreate(finalArr, {ignoreDuplicates: true})
        res.status(200).send('Temperaments added succesfully!')
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
