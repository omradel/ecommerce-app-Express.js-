import subCategoryModel from "../models/subCategoryModel.js";
import expressAsyncHandler from "express-async-handler";
import ApiFeatures from "../utils/apiFeatures.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

// @desc    create new subcategory
// @route   POST /subcategory
// @access  private
export const setCategoryIdtoBody = (req, res, next) => {
  if (!req.body.category_id) req.body.category_id = req.params.categoryId;
  next();
};

export const createSubcategory = createOne(subCategoryModel);

// @desc    get all subcategories
// @route   GET /subcategory
// @access  public
export const filterSubcategories = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category_id: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

export const getSubcategories = getAll(subCategoryModel);

// @desc    get single subcategory
// @route   GET /subcategory/:id
// @access  public
export const getSubcategory = getOne(subCategoryModel);

// @desc    update  subcategory
// @route   PUT /subcategory/:id
// @access  private
export const updateSubcategory = updateOne(subCategoryModel);

// @desc    delete subcategory
// @route   DELETE /subcategory/:id
// @access  private
export const delteSubcategory = deleteOne(subCategoryModel);
