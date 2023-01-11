const express = require("express");

//controllers
const { createHourAttention } = require('../controllers/hourAttention.controller')

const hourAttentionRouter = express.Router();


hourAttentionRouter.post('/', createHourAttention)


module.exports = {hourAttentionRouter}