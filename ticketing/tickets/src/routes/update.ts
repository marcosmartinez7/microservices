import {
  NotFoundError,
  requireAuth,
  UnauthorizedError,
  validateRequest,
} from "@sapienslabs/ticketing-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").trim().notEmpty().withMessage("Title must not be empty"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const foundTicket = await Ticket.findById(req.params.id);
    if (!foundTicket) {
      throw new NotFoundError();
    }

    if (foundTicket.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }

    const { title, price } = req.body;
    foundTicket.title = title;
    foundTicket.price = price;
    await foundTicket.save();
    res.status(200).send(foundTicket);
  }
);

export { router as updateTicketRouter };
