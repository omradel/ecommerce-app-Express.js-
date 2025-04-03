import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: true,
      minlength: [3, "category name is too short"],
      maxlength: [100, "category name is too long"],
      trim: true,
      lowercase: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const categoryModel = mongoose.model("categoryModel", categorySchema);

export default categoryModel;
