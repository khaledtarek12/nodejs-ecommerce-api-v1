const express = require("express");
const router = express.Router();
const { getCategory, createCategory, getCategoryById, updateCategory, deleteCategory } = require("../services/categoryServices");
const { getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require("../utils/validators/ctaregoryValidators");
// Routes
// router.post("/", getCategory);
// router.post("/create", createCategory);

router.route("/")
    .get(getCategory)
    .post(createCategoryValidator, createCategory);

router.route("/:id")
    .get(getCategoryValidator, getCategoryById)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;