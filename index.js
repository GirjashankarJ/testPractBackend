import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./apis/users.js";
import postRoutes from "./apis/post.js";
import miscRoutes from "./apis/misc.js";

dotenv.config(".env");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", miscRoutes);

app.listen(process.env.PORT, () => {
  console.log(process.env.MESSAGE + " On Port " + process.env.PORT);
});
