// Models
const { Clinic } = require("./clinic.models");
const { User } = require("./user.model");
const { Services } = require("../models/services.model");
const { HourAttention } = require('../models/hourAttention.model');
const { ImgsClinic } = require("./imgsClinic.model");
const { Reservation } = require('../models/reservation.model')

const initModels = () => {
  // 1 User <---> 1 Clinic
  User.hasOne(Clinic, { foreignKey: "userId" });
  Clinic.belongsTo(User);

  // 1 Clinic <---> M ImgsClinic
  Clinic.hasMany(ImgsClinic, { foreignKey: "clinicId" });
  ImgsClinic.belongsTo(Clinic);


  // 1 Clinic <---> M Services
  Clinic.hasMany(Services, { foreignKey: "clinicId" });
  Services.belongsTo(Clinic);

  // 1 Clinic <---> M HourAttention
  Clinic.hasMany(HourAttention, { foreignKey: "clinicId" });
  HourAttention.belongsTo(Clinic);

 // 1 HourAttention <----> 1 Reservation
 HourAttention.hasOne(Reservation, {foreignKey: 'hourAttentionId'});
 Reservation.belongsTo(HourAttention)

 // 1 User <-----> Reservation
 User.hasMany(Reservation, {foreignKey: 'userId'})
 Reservation.belongsTo(User)
};
 
module.exports = { initModels };
