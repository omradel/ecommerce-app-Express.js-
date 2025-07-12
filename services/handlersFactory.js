import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// deleteOne factory
export const deleteOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`not found document with id ${id}`, 404));
    }

    res
      .status(200)
      .json({ status: 200, message: "document deleted successfully" });
  });

//updateOne factory
export const updateOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`not found document with id ${id}`, 404));
    }

    res.status(200).json({ status: 200, message: "ok", data: document });
  });

// createOne factory
export const createOne = (Model) =>
  expressAsyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ status: 201, data: document });
  });

// getOne factory
export const getOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findById(id);

    if (!document) {
      return next(new ApiError(`not found brand with id ${id}`, 404));
    }

    res.status(200).json({ status: 200, message: "ok", data: document });
  });
