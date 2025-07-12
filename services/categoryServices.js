import categoryModel from "../models/categoryModel.js";
import subCategoryModel from "../models/subCategoryModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { deleteOne, updateOne, createOne, getOne } from "./handlersFactory.js";

// @desc    add new category
// @route   POST /categories
// @access  private
export const createCategory = createOne(categoryModel);

// @desc    get all categories
// @route   GET /categories
// @access  public
export const getAllCategories = expressAsyncHandler(async (req, res) => {
  // build query
  const allCategories = await categoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .paginate(allCategories)
    .sort()
    .selectFields()
    .filter()
    .search();

  // excute query
  const { query, pagination } = apiFeatures;
  const paginatedCategories = await query;

  res.status(200).json({
    status: 200,
    message: "Ok",
    data: paginatedCategories,
    pagination: allCategories && paginatedCategories.length ? pagination : null,
  });
});

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
