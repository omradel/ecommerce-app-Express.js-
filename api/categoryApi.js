import express from "express";
import { addCategory } from "../services/categoryServices.js";

const router = express.Router();

router.post("/add-category", addCategory);

export default router;
