const Category = require("../models/categoryModels");
const Asynchandler = require("express-async-handler");
const slugify = require("slugify");



// @desc create category
// @route POST /api/v1/categories
// @access private
exports.createCategory = Asynchandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
});

// @desc get all categories
// @route GET /api/v1/categories
// @access public
exports.getCategory = Asynchandler(async (req, res) => {
    const pages = req.query.pages * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (pages - 1) * limit;
    const categories = await Category.find().limit(limit).skip(skip);
    res.status(200).json({ result: categories.length, pages, data: categories });
});

// @desc get sepcific category by id
// @route GET /api/v1/categories/:id
// @access public
exports.getCategoryById = Asynchandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json({ message: `Category not found with this id  ${id}` });
    } else {
        res.status(200).json({ data: category });
    }
});

// @desc update spacific category
// @route PUT /api/v1/categories/:id
// @access private
exports.updateCategory = Asynchandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true });
    if (!category) {
        return res.status(404).json({ message: `Category not found with this id  ${id}` });
    } else {
        res.status(200).json({ data: category });
    }
});

// @desc delete spacific category
// @route DELETE /api/v1/categories/:id
// @access private
exports.deleteCategory = Asynchandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return res.status(404).json({ message: `Category not found with this id  ${id}` });
    } else {
        res.status(200).send({ message: "Category deleted successfully..." });
    }
}); 