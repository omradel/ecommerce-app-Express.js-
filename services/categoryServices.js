import categoryModel from "../models/categoryModel.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

// @desc    add new category
// @route   POST /categories
// @access  private
export const createCategory = createOne(categoryModel);

// @desc    get all categories
// @route   GET /categories
// @access  public
export const getAllCategories = getAll(categoryModel);

// @desc    get specific category
// @route   GET /categories/:id
// @access  public
export const getCategory = getOne(categoryModel);

// @desc    update specific category
// @route   PUT /categories/:id
// @access  private
export const updateCategory = updateOne(categoryModel);

// @desc    delete category
// @route   DELETE /categories/:id
// @access  private
export const deleteCategory = deleteOne(categoryModel);
