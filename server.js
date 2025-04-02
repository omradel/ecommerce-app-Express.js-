import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

app.get("/", (req, res) => {
  res.send("our api v1");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
