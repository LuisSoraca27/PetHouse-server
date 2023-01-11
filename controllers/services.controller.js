//models
const { Services } = require('../models/services.model')

//utils
const { catchAsync } = require('../utils/catchAsync.util')



const createServices = catchAsync(async(req,res,next) => {
    const { name, description, available, clinicId } = req.body

   const clinic = await Services.create({
        name,
        description,
        available,
        clinicId
    })

    res.status(201).json({
        status:'success',
        data: {clinic}
    })
})

const getAllServices = catchAsync( async (req,res,next) => {

    const services = await Services.findAll({where:{status:'active'}})

    res.status(200).json({
        status:'success',
        data: {services}
    })
})

const updateService = catchAsync(async (req,res,next) => {
    const { service } = req
    const { name, description, available } = req.body

    await service.update({
        name,
        description,
        available,
    })

    res.status(200).json({
        status:'success',
        data:{service}
    })
})

const deleteService = catchAsync( async (req,res,next) => {
    const { service } = req

    await service.update({status:'delete'})

    res.status(204).json({status:'success'})
})


module.exports = {createServices, getAllServices, updateService, deleteService}