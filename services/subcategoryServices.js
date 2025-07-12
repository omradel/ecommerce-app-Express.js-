import subCategoryModel from "../models/subCategoryModel.js";
import categoryModel from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { deleteOne, updateOne } from "./handlersFactory.js";

// @desc    create new subcategory
// @route   POST /subcategory
// @access  private

export const setCategoryIdtoBody = (req, res, next) => {
  if (!req.body.category_id) req.body.category_id = req.params.categoryId;
  next();
};

export const createSubcategory = expressAsyncHandler(async (req, res, next) => {
  const { name, category_id } = req.body;

  const subcategory = await subCategoryModel.create({
    name,
    category: category_id,
    slug: slugify(name),
  });

  res.status(201).json({ status: 201, message: "ok", data: subcategory });
});

// @desc    get all subcategories
// @route   GET /subcategory
// @access  public
export const filterSubcategories = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

export const getSubcategories = expressAsyncHandler(async (req, res) => {
  // build query
  const allSubcategories = await subCategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
    .paginate(allSubcategories)
    .sort()
    .selectFields()
    .filter()
    .search();

  // excute query
  const { query, pagination } = apiFeatures;
  const paginatedSubcategories = await query;

  res.status(200).json({
    status: 200,
    message: "ok",
    data: paginatedSubcategories,
    pagination:
      allSubcategories && paginatedSubcategories.length ? pagination : null,
  });
});

// @desc    get single subcategory
// @route   GET /subcategory/:id
// @access  public
export const getSubcategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findById(id);

  if (!subcategory) {
    return next(new ApiError(`not founded subcetgory for this ${id}`, 404));
  }

  res.status(200).json({ status: 200, message: "ok", data: subcategory });
});

// @desc    update  subcategory
// @route   PUT /subcategory/:id
// @access  private
export const updateSubcategory = updateOne(subCategoryModel);

// @desc    delete subcategory
// @route   DELETE /subcategory/:id
// @access  private
export const delteSubcategory = deleteOne(subCategoryModel);
