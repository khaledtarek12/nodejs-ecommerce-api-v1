const Brand = require("../models/brandsModels");
const handlerFactory = require("./HandlersFactory.service");

// @desc create category
// @route POST /api/v1/categories
// @access private
exports.createBrand = handlerFactory.createOne(Brand);

// @desc get all Brands
// @route GET /api/v1/brands
// @access public
exports.getBrands = handlerFactory.getAll(Brand);

// @desc get sepcific brand by id
// @route GET /api/v1/brands/:id
// @access public
exports.getBrandById = handlerFactory.getOneById(Brand);

// @desc update spacific brand
// @route PUT /api/v1/brands/:id
// @access private
exports.updateBrand = handlerFactory.updateOne(Brand);

// @desc delete spacific brand
// @route DELETE /api/v1/brands/:id
// @access private
exports.deleteBrand = handlerFactory.deleteOne(Brand);
