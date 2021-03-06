import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@sapienslabs/ticketing-common";
import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

app.use(errorHandler);

app.use(createChargeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
