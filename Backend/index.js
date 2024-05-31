import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./src/Routes/user.route.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth/", userRoutes);

app.use((err, req, res, next) => {
  const message = err.message || "Internal server error";
  const success = err.success || false;
  const token = err.token;
  let obj = { success, message };
  if (token) {
    obj["token"] = token;
  }
  return res.send(obj);
});

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log(`Connected to MonogoDB`);
  });
};

app.listen(port, () => {
  connection();
  console.log(`Server is Running on port ${port}`);
});
