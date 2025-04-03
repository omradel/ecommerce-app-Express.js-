import express from "express";
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
  .get(getCategory)
  .delete(deleteCategory)
  .put(updateCategory);

export default router;
