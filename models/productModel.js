import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product title is required"],
      unique: [true, "product title must be unique"],
      minlength: [3, "product title is too short"],
      maxlength: [20, "product title is too long"],
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [20, "description is too short"],
      maxlength: [2000, "description is too long "],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "product price is required"],
      trim: true,
      max: [20000, "too long product price"],
    },

    price_after_descount: {
      type: Number,
    },

    sold: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "categoryModel",
      required: [true, "product must belong to category"],
    },

    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategoryModel",
      },
    ],

    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "brandModel",
    },

    rating_number: {
      type: Number,
      min: [1, "rating number must be above or equal 1.0"],
      max: [5, "rating number must be less than 5.0"],
    },

    total_ratings: {
      type: Number,
      default: 0,
    },

    colors: [String],

    image_cover: {
      type: String,
      required: [true, "image cover is required"],
    },

    images: [String],
  },
  { timestamps: true, versionKey: false }
);

const productModel = mongoose.model("productModel", productSchema);

export default productModel;
