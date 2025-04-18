import express from "express";
import subcategoryRoutes from "./supcategoryApi.js";

import {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} from "../utils/validator/categoryValidator.js";

import {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../services/categoryServices.js";

const router = express.Router();

// nested route aproach to get subcategories for specific category
router.use("/:categoryId/subcategory", subcategoryRoutes);

router
  .route("/")
  .get(getAllCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .delete(deleteCategoryValidator, deleteCategory)
  .put(updateCategoryValidator, updateCategory);

export default router;
