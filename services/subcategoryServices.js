import subCategoryModel from "../models/subCategoryModel.js";
import categoryModel from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";

// @desc    create new subcategory
// @route   POST /subcategory
// @access  private

export const setCategoryIdtoBody = (req, res, next) => {
  if (!req.body.category_id) req.body.category_id = req.params.categoryId;
  next();
};

export const createSubcategory = expressAsyncHandler(async (req, res, next) => {
  const { name, category_id } = req.body;

  const category = await categoryModel.findById(category_id);

  if (!category) {
    return next(new ApiError(`not found category with id ${category_id}`, 404));
  }

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
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.per_page) || 5;
  const skip = (page - 1) * per_page;
  const allSubcategories = await subCategoryModel.countDocuments();
  const total_pages = Math.ceil(allSubcategories / per_page);

  const subcategories = await subCategoryModel
    .find(req.filterObj)
    .limit(per_page)
    .skip(skip);
  // .populate({ path: "category", select: "name -_id" });

  res.status(200).json({
    status: 200,
    message: "ok",
    data: subcategories,
    pagination: { page, per_page, total_pages, total: allSubcategories },
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
export const updateSubcategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category_id } = req.body;
  const category = await categoryModel.findById(category_id);

  if (!category) {
    return next(
      new ApiError(`not founded category for this id ${category_id}`, 404)
    );
  }

  const updatedSubcategory = await subCategoryModel
    .findByIdAndUpdate(
      id,
      { name, category: category_id, slug: slugify(name) },
      { new: true }
    )
    .populate({ path: "category", select: "name -_id" });

  if (!updatedSubcategory) {
    return next(new ApiError(`not founded subcategory for this id ${id}`, 404));
  }

  res
    .status(200)
    .json({ status: 200, message: "ok", data: updatedSubcategory });
});

// @desc    delete subcategory
// @route   DELETE /subcategory/:id
// @access  private
export const delteSubcategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedSubCategory = await subCategoryModel.findByIdAndDelete(id);

  if (!deletedSubCategory) {
    return next(new ApiError(`not founded subcategory for this id ${id}`, 404));
  }

  res
    .status(200)
    .json({ status: 200, message: "subcategory deleted successfully" });
});
