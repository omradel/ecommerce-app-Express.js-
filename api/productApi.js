import express from "express";

import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../services/productServices.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
