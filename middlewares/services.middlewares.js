//models
const { Services } = require("../models/services.model");

//utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");


const servicesExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const service = await Services.findOne({ where: { status: "active", id } });

  if (!service) {
    return next(new AppError("This service not found", 404));
  }
  req.service = service;
  next();
});

module.exports = { servicesExist };
