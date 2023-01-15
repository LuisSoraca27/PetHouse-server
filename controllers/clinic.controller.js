//models
const { Clinic } = require("../models/clinic.models");
const { HourAttention } = require("../models/hourAttention.model");
const { ImgsClinic } = require("../models/imgsClinic.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");

//firebase
const {
  uploadClinicImgs,
  getClinicImgsUrls,
  getClinicsImgsUrls,
} = require("../utils/firebase");

const createClinic = catchAsync(async (req, res, next) => {
  const { name, adress, description } = req.body;
  const { sessionUser } = req;

  const clinic = await Clinic.create({
    name,
    description,
    adress,
    userId: sessionUser.id,
  });

  await uploadClinicImgs(req.files, clinic.id);

  res.status(201).json({
    status: "success",
    data: { clinic },
  });
});

const getAllClinic = catchAsync(async (req, res, next) => {
  let clinics = await Clinic.findAll({
    where: { status: "active" },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { model: ImgsClinic },
  });

  clinics = await getClinicsImgsUrls(clinics)

  res.status(200).json({
    status: "success",
    data: { clinics },
  });
});

const getClinicById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let clinic = await Clinic.findOne({
    where: { id, status: "active" },
    include: { model: ImgsClinic, include: [{ model: HourAttention, where: { status: 'active' } }] },
  });

  clinic = await getClinicImgsUrls(clinic);

  res.status(200).json({
    status: "success",
    data: { clinic },
  });
});

const deleteClinic = catchAsync(async (req, res, next) => {
  const { clinic } = req

  await clinic.update({ status: 'delete' })

  res.status(204).json({ status: 'success' })
})

module.exports = {
  createClinic,
  getClinicById,
  getAllClinic,
  deleteClinic,
};
