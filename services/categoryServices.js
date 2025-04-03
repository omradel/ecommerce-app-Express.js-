import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";

// @desc    add new category
// @route   GET /categories/add-category
// @access  private
export const createCategory = expressAsyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ status: 201, data: category });
});

// @desc    get all categories
// @route   GET /categories
// @access  public
export const getAllCategories = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.page);
  const per_page = Number(req.query.per_page);
  const skip = (page - 1) * per_page;
  const allCategories = await categoryModel.countDocuments();
  const total_pages = allCategories / per_page;

  const paginatedCategories = await categoryModel
    .find({})
    .limit(per_page)
    .skip(skip);
  res.status(200).json({
    status: 200,
    message: "Ok",

    data: paginatedCategories,
    pagination: {
      total: allCategories,
      page,
      per_page,
      total_pages,
      next_page: page < total_pages,
      prev_page: page > 1,
    },
  });
});

// @desc    get specific category
// @route   GET /categories/:id
// @access  public
export const getCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const singlecategory = await categoryModel.findById(id);
  if (!singlecategory) {
    return res
      .status(404)
      .json({ status: 404, message: `category for ${id} not founded` });
  }
  res.status(200).json({ status: 200, message: "ok", data: singlecategory });
});

// @desc    update specific category
// @route   PUT /categories/:id
// @access  private
export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!updatedCategory) {
    return res
      .status(404)
      .json({ status: 404, message: `category with ${id} not founded` });
  }

  res.status(200).json({ status: 200, message: "ok", data: updatedCategory });
});

// @desc    delete category
// @route   DELETE /categories/:id
// @access  private
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedCategory = await categoryModel.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res
      .status(404)
      .json({ status: 404, message: `Not founded category for ${id}` });
  }

  res
    .status(200)
    .json({ status: 200, message: "category deleted successfully" });
});
