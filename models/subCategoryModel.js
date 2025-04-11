import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "subcategory name must be unique"],
      required: [true, "subcategory name is required"],
      minlength: [3, "subcategory name is too short"],
      maxlength: [100, "subcategory name is too long"],
      trim: true,
      lowercase: true,
    },

    slug: {
      type: String,
    },

    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "categoryModel",
      required: [true, "subcategory must belong to a category"],
    },
  },
  { timestamps: true, versionKey: false }
);

const subCategoryModel = mongoose.model("subCategoryModel", subCategorySchema);

export default subCategoryModel;
