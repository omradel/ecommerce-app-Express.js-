import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import ApiError from "./utils/apiError.js";
import globalErrorHndler from "./middlewares/errorMiddleware.js";
import categoryRoutes from "./api/categoryApi.js";
import subcategoryRoute from "./api/supcategoryApi.js";
import brandsRoutes from "./api/brandApi.js";
import productRoutes from "./api/productApi.js";

dotenv.config({ path: ".env" });

// connection to db
dbConnection();

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("app logger");
}

// mount app routes
app.use("/categories", categoryRoutes);
app.use("/subcategory", subcategoryRoute);
app.use("/brands", brandsRoutes);
app.use("/products", productRoutes);

app.all(/.*/, (req, res, next) => {
  next(new ApiError(`can not find this route ${req.originalUrl}`, 500));
});

// global error handler (middleware)
app.use(globalErrorHndler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

// handle errors outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection:  ${err}`);
  server.close(() => {
    console.log("Server sutting down.......");
    process.exit(1);
  });
});
