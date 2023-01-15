const express = require("express");

//controllers
const {
    createHourAttention, 
    reserved, 
    getReservationByClinic } = require('../controllers/hourAttention.controller')

//middlewares
const { protectAdmin, protectSession, protectUsersAccount } = require('../middlewares/auth.middlewares')

const hourAttentionRouter = express.Router();

// hourAttentionRouter.use(protectSession)

hourAttentionRouter.get('/', protectSession,protectAdmin, getReservationByClinic)
hourAttentionRouter.post('/reserved/:id', reserved)
hourAttentionRouter.post('/', protectAdmin, createHourAttention)



module.exports = { hourAttentionRouter }