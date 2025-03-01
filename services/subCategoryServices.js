const slugify = require("slugify");
const Asynchandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModels");
const ApiError = require("../utils/apiError");

// middleware to add Category id  to subCategory
exports.addCategoryToSubCategory = Asynchandler(async (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
});
// @desc create sub Category
// @route POST /api/v1/sub-categories
// @access private
exports.createSubCategory = Asynchandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

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
exports.getSubCategory = Asynchandler(async (req, res) => {
  const pages = req.query.pages * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (pages - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObject)
    .limit(limit)
    .skip(skip);
  // .populate({ path: "category",select: "name -_id",});
  res
    .status(200)
    .json({ result: subCategories.length, pages, data: subCategories });
});

// @desc get sepcific sub category by id
// @route GET /api/v1/sub-categories/:id
// @access public
exports.getSubCategoryById = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    // return res.status(404).json({ message: `SubCategory not found with this id  ${id}` });
    return next(new ApiError(`SubCategory not found with this id  ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc update sepcific sub category by id
// @route PUT /api/v1/sub-categories/:id
// @access private
exports.updateSubCategory = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    // return res.status(404).json({ message: `SubCategory not found with this id  ${id}` });
    return next(new ApiError(`SubCategory not found with this id  ${id}`, 404));
  }

  res.status(200).json({ data: subCategory });
});

// @desc delete spacific sub category by id
// @route DELETE /api/v1/sub-categories/:id
// @access private
exports.deleteSubCategory = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    // return res.status(404).json({ message: `SubCategory not found with this id  ${id}` });
    return next(new ApiError(`SubCategory not found with this id  ${id}`, 404));
  }

  res.status(200).send({ message: "SubCategory deleted successfully..." });
});
