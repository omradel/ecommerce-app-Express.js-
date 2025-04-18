import mongoose from "mongoose";

const brandsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: [true, "brand name must be unique"],
      minlength: [3, "brand name is too short"],
      maxlength: [20, "brand name is too long"],
      trim: true,
      lowercase: true,
    },

    slug: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const brandModel = mongoose.model("brandModel", brandsSchema);

export default brandModel;
