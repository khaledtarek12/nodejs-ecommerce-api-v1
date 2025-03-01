const slugify = require("slugify");
const Asynchandler = require("express-async-handler");
const brandModel = require("../models/brandsModels");
const ApiError = require("../utils/apiError");

// @desc create category
// @route POST /api/v1/categories
// @access private
exports.createBrand = Asynchandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc get all Brands
// @route GET /api/v1/brands
// @access public
exports.getBrands = Asynchandler(async (req, res) => {
  const pages = req.query.pages * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (pages - 1) * limit;
  const brands = await brandModel.find().limit(limit).skip(skip);
  res.status(200).json({ result: brands.length, pages, data: brands });
});

// @desc get sepcific brand by id
// @route GET /api/v1/brands/:id
// @access public
exports.getBrandById = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`brand not found with this id  ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc update spacific brand
// @route PUT /api/v1/brands/:id
// @access private
exports.updateBrand = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    // return res.status(404).json({ message: `brand not found with this id  ${id}` });
    return next(new ApiError(`brand not found with this id  ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc delete spacific brand
// @route DELETE /api/v1/brands/:id
// @access private
exports.deleteBrand = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    // return res.status(404).json({ message: `brand not found with this id  ${id}` });
    return next(new ApiError(`brand not found with this id  ${id}`, 404));
  }

  res.status(200).send({ message: "brand deleted successfully..." });
});
