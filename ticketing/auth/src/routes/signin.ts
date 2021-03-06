import express, { Request, Response } from "express";

import { body } from "express-validator";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import {
  validateRequest,
  BadRequestError,
} from "@sapienslabs/ticketing-common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatchs = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatchs) {
      throw new BadRequestError("Invalid credentials");
    }

    //Generate json web token, store on session object
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: token,
    };

    return res.send(existingUser);
  }
);

export { router as signinRouter };
