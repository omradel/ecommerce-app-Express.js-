import brandModel from "../models/brandsModel.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

// @desc    add new brand
// @route   POST /brands
// @access  private
export const createBrand = createOne(brandModel);

// @desc    get all brands
// @route   GET /brands
// @access  public
export const getAllBrands = getAll(brandModel);

// @desc    get specific brand
// @route   GET /brands/:id
// @access  public
export const getBrand = getOne(brandModel);

// @desc    update specific brand
// @route   PUT /brands/:id
// @access  private
export const updateBrand = updateOne(brandModel);

// @desc    delete brand
// @route   DELETE /brand/:id
// @access  private
export const deleteBrand = deleteOne(brandModel);
