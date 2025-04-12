import express from "express";
import { createSubcategoryValidator } from "../utils/validator/subcategoryValidator.js";
import {
  createSubcategory,
  getSubcategories,
} from "../services/subcategoryServices.js";

const router = express.Router();

router
  .route("/")
  .get(getSubcategories)
  .post(createSubcategoryValidator, createSubcategory);

export default router;
