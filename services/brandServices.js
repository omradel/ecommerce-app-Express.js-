import brandModel from "../models/brandsModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import Pagination from "../utils/pagination.js";

// @desc    add new brand
// @route   POST /brands
// @access  private
export const createBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const newBrand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ status: 201, data: newBrand });
});

// @desc    get all brands
// @route   GET /brands
// @access  public
export const getAllBrands = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.per_page) || 5;
  const skip = (page - 1) * per_page;

  const [allBrands, paginatedBrands] = await Promise.all([
    brandModel.countDocuments(),
    brandModel.find({}).limit(per_page).skip(skip),
  ]);

  const total_pages = Math.ceil(allBrands / per_page);

  const pagination = new Pagination(allBrands, page, per_page, total_pages);

  res.status(200).json({
    status: 200,
    message: "Ok",
    data: paginatedBrands,
    pagination: allBrands && paginatedBrands.length ? pagination : null,
  });
});

// @desc    get specific brand
// @route   GET /brands/:id
// @access  public
export const getBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const singleBrand = await brandModel.findById(id);

  if (!singleBrand) {
    return next(new ApiError(`not found brand with id ${id}`, 404));
  }

  res.status(200).json({ status: 200, message: "ok", data: singleBrand });
});

// @desc    update specific brand
// @route   PUT /brands/:id
// @access  private
export const updateBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedBrand = await brandModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!updatedBrand) {
    return next(new ApiError(`not found brand with id ${id}`, 404));
  }

  res.status(200).json({ status: 200, message: "ok", data: updatedBrand });
});

// @desc    delete brand
// @route   DELETE /brand/:id
// @access  private
export const deleteBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedBrand = await brandModel.findByIdAndDelete(id);

  if (!deletedBrand) {
    return next(new ApiError(`not found brand with id ${id}`, 404));
  }

  res.status(200).json({ status: 200, message: "brand deleted successfully" });
});
