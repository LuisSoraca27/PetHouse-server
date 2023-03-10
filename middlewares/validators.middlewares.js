const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }
  next();
};

const createUserValidators = [
  body("lastName")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("firstName")
    .isString()
    .withMessage("firstName must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("phone")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 10 })
    .notEmpty()
    .withMessage("Phone cannot be empty"),
  checkValidations,
];

const createClinicValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("adress")
    .isString()
    .withMessage("Address must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  checkValidations,
];

const createServicesValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"), 
  checkValidations,
];

module.exports = {
  createUserValidators,
  createClinicValidators,
  createServicesValidators,
};
