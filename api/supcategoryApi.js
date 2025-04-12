import express from "express";
import {
  createSubcategoryValidator,
  getSubcategoryValidator,
} from "../utils/validator/subcategoryValidator.js";
import {
  createSubcategory,
  getSubcategories,
  getSubcategory,
} from "../services/subcategoryServices.js";

const router = express.Router();

router
  .route("/")
  .get(getSubcategories)
  .post(createSubcategoryValidator, createSubcategory);

router.route("/:id").get(getSubcategoryValidator, getSubcategory);

export default router;
