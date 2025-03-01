const { check } = require("express-validator");
const validatiorMiddleware = require("../../middlewares/validatorMiddleware");

// DRY - Don't repeat yourself

exports.createCategoryValidator = [
    //1- rules
    check("name")
        .isEmpty().withMessage("Category name is required")
        .isLength({ min: 3 }).withMessage("Category name must be at least 3 characters")
        .isLength({ max: 32 }).withMessage("Category name must be at most 32 characters"),
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
    //2- middleware
    validatiorMiddleware,
];

exports.deleteCategoryValidator = [
    //1- rules
    check("id").isMongoId().withMessage("Invalid category id format"),
    //2- middleware
    validatiorMiddleware,
];