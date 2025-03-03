const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatiorMiddleware = require("../../middlewares/validatorMiddleware");

// DRY - Don't repeat yourself

exports.createCategoryValidator = [
  //1- rules
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Category name must be at most 32 characters")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  //2- middleware
  validatiorMiddleware,
];

exports.getCategoryValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid category id format"),
  //2- middleware
  validatiorMiddleware,
];

exports.updateCategoryValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  //2- middleware
  validatiorMiddleware,
];

exports.deleteCategoryValidator = [
  //1- rules
  check("id").isMongoId().withMessage("Invalid category id format"),
  //2- middleware
  validatiorMiddleware,
];
