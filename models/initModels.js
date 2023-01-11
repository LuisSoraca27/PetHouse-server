// Models
const { Clinic } = require("./clinic.models");
const { User } = require("./user.model");
const { Services } = require("../models/services.model");
const { HourAttention } = require('../models/hourAttention.model');
const { ImgsClinic } = require("./imgsClinic.model");

const initModels = () => {
  // 1 User <---> 1 Clinic
  User.hasOne(Clinic, { foreignKey: "userId" });
  Clinic.belongsTo(User);

  // 1 Clinic <---> 1 LogoClinic
  Clinic.hasMany(ImgsClinic, { foreignKey: "clinicId" });
  ImgsClinic.belongsTo(Clinic);


  // 1 Clinic <---> M Services
  Clinic.hasMany(Services, { foreignKey: "clinicId" });
  Services.belongsTo(Clinic);

  // 1 Clinic <---> M HourAttention
  Clinic.hasMany(HourAttention, { foreignKey: "clinicId" });
  HourAttention.belongsTo(Clinic);
};

module.exports = { initModels };
