import productModel from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import Pagination from "../utils/pagination.js";

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
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.per_page) || 5;
  const skip = (page - 1) * per_page;

  const [allProducts, paginatedProducts] = await Promise.all([
    productModel.countDocuments(),
    productModel.find({}).limit(per_page).skip(skip),
  ]);

  const total_pages = Math.ceil(allProducts / per_page);

  const pagination = new Pagination(allProducts, page, per_page, total_pages);

  res.status(200).json({
    status: 200,
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
export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedProduct) {
    return next(new ApiError(`not found product with id ${id}`, 404));
  }

  res.status(200).json({ status: 200, message: "ok", data: updatedProduct });
});

// @desc    delete product
// @route   DELETE /product/:id
// @access  private
export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await productModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    return next(new ApiError(`not found product with id ${id}`, 404));
  }

  res
    .status(200)
    .json({ status: 200, message: "product deleted successfully" });
});
