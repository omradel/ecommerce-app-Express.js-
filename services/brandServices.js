import brandModel from "../models/brandsModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { deleteOne, updateOne, createOne } from "./handlersFactory.js";

// @desc    add new brand
// @route   POST /brands
// @access  private
export const createBrand = createOne(brandModel);

// @desc    get all brands
// @route   GET /brands
// @access  public
export const getAllBrands = expressAsyncHandler(async (req, res) => {
  // build query
  const allBrands = await brandModel.countDocuments();
  const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate(allBrands)
    .sort()
    .selectFields()
    .filter()
    .search();

  // excute query
  const { query, pagination } = apiFeatures;
  const paginatedBrands = await query;

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
export const updateBrand = updateOne(brandModel);

// @desc    delete brand
// @route   DELETE /brand/:id
// @access  private
export const deleteBrand = deleteOne(brandModel);
