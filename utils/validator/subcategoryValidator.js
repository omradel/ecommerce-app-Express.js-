import { check } from "express-validator";
import validatorMiddlewares from "../../middlewares/validatorMiddleware.js";
import categoryModel from "../../models/categoryModel.js";

export const createSubcategoryValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("subcategory name is required")
    .isLength({ min: 3 })
    .withMessage("subcategory name is too short")
    .isLength({ max: 20 })
    .withMessage("subcategory name is too long"),
  check("category_id")
    .notEmpty()
    .withMessage("category id is required")
    .isMongoId()
    .withMessage("category id must be a valid id")
    .custom(async (value) => {
      const id = await categoryModel.findById(value);
      if (!id) {
        throw new Error("category not founded");
      }
    }),

  validatorMiddlewares,
];

export const getSubcategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subcategory id is required")
    .isMongoId()
    .withMessage("subcategory id must be a valid id"),
  validatorMiddlewares,
];

export const updateSubcategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subcategory id is required")
    .isMongoId()
    .withMessage("subcategory id must be a valid id"),
  check("name")
    .trim()
    .notEmpty()
    .withMessage("subcategory name is required")
    .isLength({ min: 3 })
    .withMessage("subcategory name is too short")
    .isLength({ max: 20 })
    .withMessage("subcategory name is too long"),
  check("category_id")
    .notEmpty()
    .withMessage("category id is required")
    .isMongoId()
    .withMessage("category id must be a valid id")
    .custom(async (value) => {
      const id = await categoryModel.findById(value);
      if (!id) {
        throw new Error("category not founded");
      }
    }),
  ,
  validatorMiddlewares,
];

export const deleteSubcategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subcategory id is required")
    .isMongoId()
    .withMessage("subcategory id must be a valid id"),
  validatorMiddlewares,
];
