const { check } = require("express-validator");
const validatiorMiddleware = require("../../middlewares/validatorMiddleware");

// DRY - Don't repeat yourself

exports.createBrandValidator = [
  //1- rules
  check("name")
    .notEmpty()
    .withMessage("brand name is required")
    .isLength({ min: 3 })
    .withMessage("brand name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("brand name must be at most 32 characters"),
  //2- middleware
  validatiorMiddleware,
];

exports.getBrandValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid brand id format"),
  //2- middleware
  validatiorMiddleware,
];

exports.updateBrandValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid brand id format"),
  //2- middleware
  validatiorMiddleware,
];

exports.deleteBrandValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid brand id format"),
  //2- middleware
  validatiorMiddleware,
];
