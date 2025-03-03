const Category = require("../models/categoryModels");
const handlerFactory = require("./HandlersFactory.service");

// @desc create category
// @route POST /api/v1/categories
// @access private
exports.createCategory = handlerFactory.createOne(Category);

// @desc get all categories
// @route GET /api/v1/categories
// @access public
exports.getCategory = handlerFactory.getAll(Category);

// @desc get sepcific category by id
// @route GET /api/v1/categories/:id
// @access public
exports.getCategoryById = handlerFactory.getOneById(Category);

// @desc update spacific category
// @route PUT /api/v1/categories/:id
// @access private
exports.updateCategory = handlerFactory.updateOne(Category);

// @desc delete spacific category
// @route DELETE /api/v1/categories/:id
// @access private
exports.deleteCategory = handlerFactory.deleteOne(Category);
