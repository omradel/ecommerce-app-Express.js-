import express from "express";
import {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validator/brandValidator.js";
import {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} from "../services/brandServices.js";

const router = express.Router();

router.route("/").get(getAllBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
