const express = require("express");

// mergeParams allows us to access paramters on another routes
const router = express.Router({ mergeParams: true });
const {
  createSubCategory,
  getSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  addCategoryToSubCategory,
  createFilterdSubCtagory,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidators");

router
  .route("/")
  .post(addCategoryToSubCategory, createSubCategoryValidator, createSubCategory)
  .get(createFilterdSubCtagory, getSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
