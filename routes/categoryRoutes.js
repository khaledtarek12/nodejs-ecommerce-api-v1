const express = require("express");
const router = express.Router();
const { getCategory, createCategory, getCategoryById, updateCategory, deleteCategory } = require("../services/categoryServices");

// Routes
// router.post("/", getCategory);
// router.post("/create", createCategory);

router.route("/").get(getCategory).post(createCategory);
router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = router;