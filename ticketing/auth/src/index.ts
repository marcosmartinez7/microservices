import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No JWT_)KEY");
  }
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auht");
  app.listen(3000, () => {
    console.log("Auth service started at port 3000!");
  });
};

start();
