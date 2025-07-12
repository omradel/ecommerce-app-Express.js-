import productModel from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { deleteOne, updateOne } from "./handlersFactory.js";

// @desc    create product
// @route   POST /products
// @access  private
export const createProduct = expressAsyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ status: 201, message: "ok", data: product });
});

// @desc    get all products
// @route   GET /products
// @access  public
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  // build query
  const allProducts = await productModel.countDocuments();
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate(allProducts)
    .sort()
    .selectFields()
    .filter()
    .search();

  // excute query
  const { query, pagination } = apiFeatures;
  const paginatedProducts = await query;

  res.status(200).json({
    status: 200,
    results: paginatedProducts.length,
    message: "Ok",
    data: paginatedProducts,
    pagination: allProducts && paginatedProducts.length ? pagination : null,
  });
});

// @desc    get specific product
// @route   GET /product/:id
// @access  public
export const getProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return next(new ApiError(`not found product with id ${id}`, 404));
  }

  res.status(200).json({ status: 200, message: "ok", data: product });
});

// @desc    update specific product
// @route   PUT /product/:id
// @access  private
export const updateProduct = updateOne(productModel);

// @desc    delete product
// @route   DELETE /product/:id
// @access  private
export const deleteProduct = deleteOne(productModel);
