import express from "express";
import {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validator/categoryValidator.js";

import {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../services/categoryServices.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .delete(deleteCategoryValidator, deleteCategory)
  .put(updateCategoryValidator, updateCategory);

export default router;
