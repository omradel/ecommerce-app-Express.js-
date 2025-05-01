import express from "express";

import {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validator/productValidator.js";

import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../services/productServices.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(createProductValidator, createProduct);

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
