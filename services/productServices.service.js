const slugify = require("slugify");
const Asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Products = require("../models/productsModels.module");
const ApiFeatures = require("../utils/apiFeatures");

// @desc create Products
// @route POST /api/v1/products
// @access private
exports.createProducts = Asynchandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Products.create(req.body);
  res.status(201).json({ data: product });
});

// @desc get all products
// @route GET /api/v1/products
// @access public
exports.getProducts = Asynchandler(async (req, res) => {
  const numberOfDocs = await Products.countDocuments();
  const apiFeatures = new ApiFeatures({
    mongooseQuery: Products.find(),
    queryString: req.query,
  });
  //1- filtering / 2- pagination / 3- sorting /4- limit fields /5- search
  apiFeatures
    .Filter()
    .Search()
    .Pagination({ numberOfDocs })
    .LimitFields()
    .Sort();
  // Executing query
  const { mongooseQuery, pagination } = apiFeatures;
  const products = await mongooseQuery;
  res.status(200).json({ result: products.length, pagination, data: products });
});

// @desc get sepcific Products by id
// @route GET /api/v1/products/:id
// @access public
exports.getProductsById = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const products = await Products.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!products) {
    return next(new ApiError(`Products not found with this id  ${id}`, 404));
  }
  res.status(200).json({ data: products });
});

// @desc update spacific Products
// @route PUT /api/v1/products/:id
// @access private
exports.updateProducts = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const products = await Products.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!products) {
    // return res.status(404).json({ message: `Products not found with this id  ${id}` });
    return next(new ApiError(`Products not found with this id  ${id}`, 404));
  }

  res.status(200).json({ data: products });
});

// @desc delete spacific Products
// @route DELETE /api/v1/products/:id
// @access private
exports.deleteProducts = Asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const products = await Products.findByIdAndDelete(id);
  if (!products) {
    // return res.status(404).json({ message: `Products not found with this id  ${id}` });
    return next(new ApiError(`Products not found with this id  ${id}`, 404));
  }

  res.status(200).send({ message: "Products deleted successfully..." });
});
