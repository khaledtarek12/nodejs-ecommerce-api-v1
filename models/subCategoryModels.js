const mongoose = require("mongoose");

// create a schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "SubCategory name is required"],
      unique: [true, "SubCategory name must be unique"],
      minlength: [2, "SubCategory name must be at least 3 characters"],
      maxlength: [32, "SubCategory name must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  {
    timestamps: true,
  }
);

// create a model
const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategoryModel;
