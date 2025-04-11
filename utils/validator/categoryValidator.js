import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category name is required")
    .isLength({ min: 3 })
    .withMessage("category name is too short")
    .isLength({ max: 20 })
    .withMessage("category name is too long"),
  validatorMiddleware,
];

export const getCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid category id format"),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid category id format"),
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name is too short")
    .isLength({ max: 100 })
    .withMessage("name is too long"),
  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid category id format"),
  validatorMiddleware,
];
