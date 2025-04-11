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
