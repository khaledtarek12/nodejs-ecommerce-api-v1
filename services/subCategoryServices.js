const Asynchandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModels");
const handlerFactory = require("./HandlersFactory.service");

// middleware to add Category id  to subCategory
exports.addCategoryToSubCategory = Asynchandler(async (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
});
// @desc create sub Category
// @route POST /api/v1/sub-categories
// @access private
exports.createSubCategory = handlerFactory.createOne(SubCategory);

exports.createFilterdSubCtagory = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  console.log(
    `\x1b[44m req.query.categoryId: ${req.params.categoryId} \x1b[0m`
  );
  req.filterObject = filterObject;
  next();
};

// @desc get all sub categories
// @route GET /api/v1/sub-categories
// @access public
exports.getSubCategory = handlerFactory.getAll(SubCategory);

// @desc get sepcific sub category by id
// @route GET /api/v1/sub-categories/:id
// @access public
exports.getSubCategoryById = handlerFactory.getOneById(SubCategory);

// @desc update sepcific sub category by id
// @route PUT /api/v1/sub-categories/:id
// @access private
exports.updateSubCategory = handlerFactory.updateOne(SubCategory);

// @desc delete spacific sub category by id
// @route DELETE /api/v1/sub-categories/:id
// @access private
exports.deleteSubCategory = handlerFactory.deleteOne(SubCategory);
