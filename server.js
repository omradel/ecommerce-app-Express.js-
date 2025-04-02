import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import categoryRoutes from "./api/categoryApi.js";
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
