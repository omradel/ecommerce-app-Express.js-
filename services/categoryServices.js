import categoryModel from "../models/categoryModel.js";

//add new category
export const addCategory = (req, res) => {
  const name = req.body.name;

  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};
