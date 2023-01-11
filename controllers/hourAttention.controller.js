//model
const { HourAttention } = require('../models/hourAttention.model')

//utils 
const { catchAsync } = require('../utils/catchAsync.util')



const createHourAttention = catchAsync(async (req,res,next) => {
    const { hour, available, clinicId } = req.body

 const hourAttentions = hour.map( async hourX => {
    const hourAttention = await HourAttention.create({
        hour: hourX,
        available,
        clinicId
    })
    return hourAttention
 })
 Promise.all(hourAttentions)

 res.status(201).json({
    status:'success',
    data: {hourAttentions}
 })
}) 


module.exports = { createHourAttention }