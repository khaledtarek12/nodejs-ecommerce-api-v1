const Products = require("../models/productsModels.module");
const handlerFactory = require("./HandlersFactory.service");

// @desc create Products
// @route POST /api/v1/products
// @access private
exports.createProducts = handlerFactory.createOne(Products);

// @desc get all products
// @route GET /api/v1/products
// @access public
exports.getProducts = handlerFactory.getAll(Products, "Product");

// @desc get sepcific Products by id
// @route GET /api/v1/products/:id
// @access public
exports.getProductsById = handlerFactory.getOneById(Products);

// @desc update spacific Products
// @route PUT /api/v1/products/:id
// @access private
exports.updateProducts = handlerFactory.updateOne(Products);

// @desc delete spacific Products
// @route DELETE /api/v1/products/:id
// @access private
exports.deleteProducts = handlerFactory.deleteOne(Products);
