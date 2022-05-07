import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@sapienslabs/ticketing-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Find the ticket te user is trying to order in the db
    const ticket = await Ticket.findById(req.body.ticketId);
    // Make sure that this ticket is not already reserved
    if (!ticket) {
      throw new NotFoundError();
    }
    // Check if ticket is reserved

    const isReserved = await ticket.isReserved();
    console.log("isReserved", isReserved);

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // Calculate an expiration date for the order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    // Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiredAt: expiration,
      ticket,
    });
    await order.save();
    // Publish an event saying that an order was created

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
