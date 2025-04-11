import express from "express";
import { createSubcategoryValidator } from "../utils/validator/subcategoryValidator.js";
import { createSubcategory } from "../services/subcategoryServices.js";

const router = express.Router();

router.route("/").post(createSubcategoryValidator, createSubcategory);

export default router;
