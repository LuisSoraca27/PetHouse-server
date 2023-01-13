//model
const { HourAttention } = require('../models/hourAttention.model')

//utils 
const { catchAsync } = require('../utils/catchAsync.util')



const createHourAttention = catchAsync(async (req, res, next) => {
   const { hour, available, clinicId } = req.body
   let hourAttentions = []

   hour.forEach(async ele => {
      const hourAttention = await HourAttention.create({
         hour: ele,
         available,
         clinicId
      })
      hourAttentions.push(hourAttention)
   }); 
   console.log(hourAttentions);


   res.status(201).json({
      status: 'success',
      data: { hourAttentions }
   })
})


module.exports = { createHourAttention }