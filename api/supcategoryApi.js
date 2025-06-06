import express from "express";
import {
  createSubcategoryValidator,
  getSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} from "../utils/validator/subcategoryValidator.js";
import {
  createSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  delteSubcategory,
  setCategoryIdtoBody,
  filterSubcategories,
} from "../services/subcategoryServices.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(filterSubcategories, getSubcategories)
  .post(setCategoryIdtoBody, createSubcategoryValidator, createSubcategory);

router
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory)
  .put(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, delteSubcategory);

export default router;
