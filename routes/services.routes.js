const express = require("express");

//controllers
const { createServices, getAllServices, deleteService,updateService } = require('../controllers/services.controller')

//middlewares
const { createServicesValidators } = require('../middlewares/validators.middlewares')
const { servicesExist } = require('../middlewares/services.middlewares')



const servicesRouter = express.Router();

servicesRouter.get('/', getAllServices )

servicesRouter.post("/", createServicesValidators, createServices )

servicesRouter.patch('/:id', servicesExist, updateService )

servicesRouter.delete('/:id', servicesExist, deleteService)


module.exports = {servicesRouter}

