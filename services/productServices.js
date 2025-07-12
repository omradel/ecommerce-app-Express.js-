import productModel from "../models/productModel.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

// @desc    create product
// @route   POST /products
// @access  private
export const createProduct = createOne(productModel);

// @desc    get all products
// @route   GET /products
// @access  public
export const getAllProducts = getAll(productModel);

// @desc    get specific product
// @route   GET /product/:id
// @access  public
export const getProduct = getOne(productModel);

// @desc    update specific product
// @route   PUT /product/:id
// @access  private
export const updateProduct = updateOne(productModel);

// @desc    delete product
// @route   DELETE /product/:id
// @access  private
export const deleteProduct = deleteOne(productModel);
