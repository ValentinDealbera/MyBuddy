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
        const dataBaseDogs = await Dog.findAll({include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }})
        const formatedDatabaseDogs = dataBaseDogs.map(e=>{
            return {
            id: e.id,    
            name: e.name,
            image: e.image,
            height: e.height,
            weight: e.weight,
            life_span: e.life_span,
            temperament: dataBaseDogs[0].temperaments.map(e=>e.dataValues.name).join(', ')
        }})
        const formatedDogs = dogsApi.data.map(e=>{
            return {
                name: e.name,
                id: e.id,
                image: e.image.url,
                weight: e.weight.metric,
                height: e.height.metric,
                life_span: e.life_span,
                temperament: e.temperament
            }
        })
        res.status(200).json([...formatedDogs, ...formatedDatabaseDogs])
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/dogs/name', async (req, res)=>{
    try {
        const {name} = req.query
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll({include: {
            model: Temperament,
            through: {
                attributes: []
            }
        }})
        const formatedDatabaseDogs = dataBaseDogs.map(e=>{
            return {
            id: e.id,
            name: e.name,
            image: e.image,
            height: e.height,
            weight: e.weight,
            life_span: e.life_span,
            temperament: dataBaseDogs[0].temperaments.map(e=>e.dataValues.name).join(', ')
        }})
        const formatedDogs = dogsApi.data.map(e=>{
            return {
                name: e.name,
                id: e.id,
                image: e.image.url,
                weight: e.weight.metric,
                height: e.height.metric,
                life_span: e.life_span
            }
        })
        const allDogs = [...formatedDogs, ...formatedDatabaseDogs]
        const specificDog = allDogs.filter(e=>e.name.toLowerCase().includes(name))
        if (!name){
            return res.status(400).json({error: 'Ingresa una raza'})
        }
        if(specificDog.length === 0) {
            return res.status(400).json({error: 'Raza inexistente'})
        }
        return res.status(200).json(specificDog)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/dogs/:idRaza', async (req, res)=>{
    try {
        const {idRaza} = req.params
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll({include: {
            model: Temperament,
            through: {
                attributes: []
            }
        }})
        const formatedDatabaseDogs = dataBaseDogs.map(e=>{
            return {
            id: e.id,
            name: e.name,
            image: e.image,
            height: e.height,
            weight: e.weight,
            life_span: e.life_span,
            temperament: dataBaseDogs[0].temperaments.map(e=>e.dataValues.name).join(', ')
        }})
        const formatedDogs = dogsApi.data.map(e=>{
            return {
                name: e.name,
                id: e.id,
                image: e.image.url,
                weight: e.weight.metric,
                height: e.height.metric,
                life_span: e.life_span
            }
        })
        const allDogs = [...formatedDogs, ...formatedDatabaseDogs]
        const specificDog = idRaza.length > 10 ? allDogs.filter(e=>e.id === idRaza) : allDogs.filter(e=>e.id === Number(idRaza))
        if(idRaza){}
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

router.post('/dogs', async (req, res)=>{
    const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll()
        const allDogs = [...dogsApi.data, ...dataBaseDogs]
    try {
        const {name, image, height, weight, life_span, temperament} = req.body
        if (allDogs.find(e=>e.name.toLowerCase() === name.toLowerCase())){
            return res.status(400).json({error: 'La raza ingresada ya existe'})
        }
        if (!name || !image || !height || !weight || !life_span || !temperament){
            return res.status(400).json({error: 'Debes completar todos los datos'})
        }
        const dog = {
            name,
            image,
            height,
            weight,
            life_span
        }
        const newDog = await Dog.create(dog)
        await newDog.addTemperaments(temperament)
        const aux = await Dog.findAll({where:{
            name: name
        },include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }})
        console.log(aux[0].temperaments[0].dataValues.name);
        const showDog = {
            name,
            image,
            height,
            weight,
            life_span,
            temperament: aux[0].temperaments.map(e=>e.dataValues.name).join(', ')
        }
        return res.status(201).json(showDog) 
    } catch (error) {
      res.status(500).json({error: error.message})  
    }
})

module.exports = router;
