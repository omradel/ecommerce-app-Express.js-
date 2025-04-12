import subCategoryModel from "../models/subCategoryModel.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import ApiError from "../utils/apiError.js";

// @desc    create new subcategory
// @route   POST /subcategory
// @access  private
export const createSubcategory = expressAsyncHandler(async (req, res, next) => {
  const { name, category_id } = req.body;

  const category = await categoryModel.findById({ _id: category_id });

  if (!category) {
    return next(new ApiError(`not found category with id ${category_id}`, 404));
  }

  const subcategory = await subCategoryModel.create({
    name,
    category_id,
    slug: slugify(name),
  });

  res.status(201).json({ status: 201, message: "ok", data: subcategory });
});

// @desc    get all subcategories
// @route   GET /subcategory
// @access  public
export const getSubcategories = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.page);
  const per_page = Number(req.query.per_page);
  const skip = (page - 1) * per_page;
  const allSubcategories = await subCategoryModel.countDocuments();
  const total_pages = allSubcategories / per_page;

  const subcategories = await subCategoryModel
    .find({})
    .limit(per_page)
    .skip(skip);

  res.status(200).json({
    status: 200,
    message: "ok",
    data: subcategories,
    pagination: { page, per_page, total_pages, total: allSubcategories },
  });
});
