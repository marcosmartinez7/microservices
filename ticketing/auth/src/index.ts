import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("Starting auth service");

  if (!process.env.JWT_KEY) {
    throw new Error("No JWT_KEY");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("No MONGO_URI");
  }
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(3000, () => {
    console.log("Auth service started at port 3000!");
  });
};

start();
