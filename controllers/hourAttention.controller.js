//model
const { Clinic } = require('../models/clinic.models')
const { HourAttention } = require('../models/hourAttention.model')
const { Reservation } = require('../models/reservation.model')
const { User } = require('../models/user.model')

//utils 
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')


const getReservationByClinic = catchAsync(async (req, res, next) => {
   const { sessionUser } = req

   const reservation = await Clinic.findAll({
      where: { status: 'active', userId: sessionUser.id },
      include: {
         model: HourAttention,
         include: [{
            model: Reservation,
            where:{status:'active'},
            include: [{ model: User, where:{status:'active', }, }]
         }]
      }
   })

   res.status(200).json({
      status: 'success',
      data: { reservation }
   })
})

const createHourAttention = catchAsync(async (req, res, next) => {

   const { hour, available } = req.body
   const { sessionUser } = req
   let hourAttentionsPromises = []

   const clinic = await Clinic.findOne({ where: { userId: sessionUser.id } })

   if (!clinic) {
      next(new AppError('the user session not exist clinic', 404))
   }

   hourAttentionsPromises = hour.map(async ele =>
      await HourAttention.create({
         hour: ele,
         available,
         clinicId: clinic.id
      })
   );
   const hourAttentions = await Promise.all(hourAttentionsPromises);

   res.status(201).json({
      status: 'success',
      data: { hourAttentions }
   })
})


const reserved = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const { sessionUser } = req

   const hourAttention = await HourAttention.findOne({
      where: { id },
      include: { model: Reservation }
   })

   if (hourAttention.available === 'available') {
      console.log('aqui pase')
      await hourAttention.update({ available: 'reserved' })
      await Reservation.create({
         hourAttentionId: hourAttention.id,
         userId: sessionUser.id
      })
   } else {
      await hourAttention.update({ available: 'available' })
      await hourAttention.reservation.update({
         status: 'deleted'
      })
   }

   res.status(204).json({
      status: 'success'
   })
})

module.exports = { createHourAttention, reserved, getReservationByClinic }