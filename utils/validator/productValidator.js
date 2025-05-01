import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("product name is required")
    .isLength({ min: 3 })
    .withMessage("product name is too short")
    .isLength({ max: 20 })
    .withMessage("product name is too long"),
  check("description")
    .notEmpty()
    .withMessage("product desc is required")
    .isLength({ min: 20 })
    .withMessage("product desc is too short")
    .isLength({ max: 2000 })
    .withMessage("product desc is too long"),
  check("price")
    .notEmpty()
    .withMessage("preduct price is required")
    .isNumeric()
    .withMessage("price must be a number")
    .isLength({ max: 10 })
    .withMessage("product price is too long"),
  check("category")
    .notEmpty()
    .withMessage("category id is required")
    .isMongoId()
    .withMessage("category id must be a valid id"),
  check("price_after_descount")
    .optional()
    .isNumeric()
    .withMessage("price_after_descount after descount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("price must be bigger than discount");
      }
      return true;
    }),

  check("rating_number")
    .optional()
    .isNumeric()
    .withMessage("rating number must be a number")
    .isLength({ min: 1 })
    .withMessage("rating is too short")
    .isLength({ max: 5 })
    .withMessage("rating is too long"),
  check("total_ratings")
    .optional()
    .isNumeric()
    .withMessage("total ratings must be a number"),
  check("sold").optional().isNumeric().withMessage("sold must be a number"),
  check("colors").optional().isArray().withMessage("colors must be an array"),
  check("image_cover").notEmpty().withMessage("image cover is required"),
  check("images").optional().isArray().withMessage("images must be an array"),

  validatorMiddleware,
];

export const getProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid product id format"),
  validatorMiddleware,
];

export const updateProductValidator = [
  check("id").isMongoId().withMessage("product id must be a valid id"),
  check("title")
    .notEmpty()
    .withMessage("product name is required")
    .isLength({ min: 3 })
    .withMessage("product name is too short")
    .isLength({ max: 20 })
    .withMessage("product name is too long"),
  check("description")
    .notEmpty()
    .withMessage("product desc is required")
    .isLength({ min: 100 })
    .withMessage("product desc is too short")
    .isLength({ max: 2000 })
    .withMessage("product desc is too long"),
  check("price")
    .notEmpty()
    .withMessage("preduct price is required")
    .isNumeric()
    .withMessage("price must be a number")
    .isLength({ max: 10 })
    .withMessage("product price is too long"),
  check("category")
    .notEmpty()
    .withMessage("category id is required")
    .isMongoId()
    .withMessage("category id must be a valid id"),
  check("price_after_descount")
    .optional()
    .isNumeric()
    .withMessage("price_after_descount after descount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("price must be bigger than discount");
      }
      return true;
    }),

  check("rating_number")
    .optional()
    .isNumeric()
    .withMessage("rating number must be a number")
    .isLength({ min: 1 })
    .withMessage("rating is too short")
    .isLength({ max: 5 })
    .withMessage("rating is too long"),
  check("total_ratings")
    .optional()
    .isNumeric()
    .withMessage("total ratings must be a number"),
  check("sold").optional().isNumeric().withMessage("sold must be a number"),
  check("colors").optional().isArray().withMessage("colors must be an array"),
  check("image_cover").isEmpty().withMessage("image cover is required"),
  check("images").optional().isArray().withMessage("images must be an array"),
  validatorMiddleware,
];

export const deleteProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid product id format"),
  validatorMiddleware,
];
