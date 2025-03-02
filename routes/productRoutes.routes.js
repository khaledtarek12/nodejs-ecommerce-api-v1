const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../services/productServices.service");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

router.route("/").get(getProducts).post(createProductValidator, createProducts);

router
  .route("/:id")
  .get(getProductValidator, getProductsById)
  .put(updateProductValidator, updateProducts)
  .delete(deleteProductValidator, deleteProducts);

module.exports = router;
