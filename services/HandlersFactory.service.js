const Asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  Asynchandler(async (req, res, next) => {
    const { id } = req.params;
    const documnet = await Model.findByIdAndDelete(id);
    if (!documnet) {
      // return res.status(404).json({ message: `Document not found with this id  ${id}` });
      return next(new ApiError(`Document not found with this id  ${id}`, 404));
    }

    res.status(200).send({ message: "Document deleted successfully..." });
  });

exports.updateOne = (Model) =>
  Asynchandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      // return res.status(404).json({ message: `Document not found with this id  ${id}` });
      return next(
        new ApiError(`Document not found with this id  ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  Asynchandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOneById = (Model) =>
  Asynchandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      // return res.status(404).json({ message: `Document not found with this id  ${id}` });
      return next(
        new ApiError(`Document not found with this id  ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = "") =>
  Asynchandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const numberOfDocs = await Model.countDocuments();
    const apiFeatures = new ApiFeatures({
      mongooseQuery: Model.find(filter),
      queryString: req.query,
    });
    //1- filtering / 2- pagination / 3- sorting /4- limit fields /5- search
    apiFeatures
      .Filter()
      .Search(modelName)
      .Pagination({ numberOfDocs })
      .LimitFields()
      .Sort();
    // Executing query
    const { mongooseQuery, pagination } = apiFeatures;
    const document = await mongooseQuery;
    res
      .status(200)
      .json({ result: document.length, pagination, data: document });
  });
