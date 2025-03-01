const { check } = require("express-validator");
const validatiorMiddleware = require("../../middlewares/validatorMiddleware");

// DRY - Don't repeat yourself

exports.createSubCategoryValidator = [
  //1- rules
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be at most 32 characters"),

  check("category")
    .notEmpty()
    .withMessage("SubCategory must be belong to parent category")
    .isMongoId()
    .withMessage("Invalid category id format"),
  //2- middleware
  validatiorMiddleware,
];

exports.getSubCategoryValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  //2- middleware
  validatiorMiddleware,
];

exports.updateSubCategoryValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  //2- middleware
  validatiorMiddleware,
];

exports.deleteSubCategoryValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  //2- middleware
  validatiorMiddleware,
];
