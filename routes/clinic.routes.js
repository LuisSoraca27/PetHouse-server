const express = require("express");

//utils
const { upload } = require("../utils/multer");

// controllers
const {
  createClinic,
  getAllClinic,
  getClinicById,
  deleteClinic,
} = require("../controllers/clinic.controller");

// middlewares
const {
  protectAdmin,
  protectSession,
  protectUsersAccount,
} = require("../middlewares/auth.middlewares");

const { clinicExist } = require('../middlewares/clinic.middlewares')

// validators
const {
  createClinicValidators,
} = require("../middlewares/validators.middlewares");

const clinicRouter = express.Router();

clinicRouter.get("/", getAllClinic);

clinicRouter.get("/:id", getClinicById)

clinicRouter.post(
  "/",
  upload.array("clinicImgs", 2),
  createClinicValidators,
  protectSession,
  protectAdmin,
  createClinic,
);

clinicRouter.delete('/:id', clinicExist, deleteClinic)

module.exports = { clinicRouter };
