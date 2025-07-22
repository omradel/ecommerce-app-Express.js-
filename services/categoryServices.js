import categoryModel from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import sharp from "sharp";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

// multer configurations (Disk Storage)
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },

//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const fileName = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, fileName);
//   },
// });

// multer configurations (Memory Storage)
const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("file uploaded must be an image", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadImage = upload.single("image");

export const imageProcess = expressAsyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.webp`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(`uploads/categories/${fileName}`);

  next();
});

// @desc    add new category
// @route   POST /categories
// @access  private
export const createCategory = createOne(categoryModel);

// @desc    get all categories
// @route   GET /categories
// @access  public
export const getAllCategories = getAll(categoryModel);

// @desc    get specific category
// @route   GET /categories/:id
// @access  public
export const getCategory = getOne(categoryModel);

// @desc    update specific category
// @route   PUT /categories/:id
// @access  private
export const updateCategory = updateOne(categoryModel);

// @desc    delete category
// @route   DELETE /categories/:id
// @access  private
export const deleteCategory = deleteOne(categoryModel);
