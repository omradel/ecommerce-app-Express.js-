import { check } from "express-validator";
import validatorMiddlewares from "../../middlewares/validatorMiddleware.js";

export const createSubcategoryValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("subcategory name is required")
    .isLength({ min: 3 })
    .withMessage("subcategory name is too short")
    .isLength({ max: 20 })
    .withMessage("subcategory name is too long"),
  validatorMiddlewares,
];
