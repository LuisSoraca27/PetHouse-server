//models
const { Clinic } = require('../models/clinic.models');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const clinicExist = catchAsync(async(req,res,next) => {
    const { id } = req.params

    const clinic = await Clinic.findOne({where:{id}, status:'active'})

    if(!clinic){
        return next(new AppError('This clinic not exist', 404))
    }
    req.clinic = clinic
    next()
})

module.exports = {clinicExist}