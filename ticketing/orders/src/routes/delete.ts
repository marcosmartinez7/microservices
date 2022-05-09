import {
  NotFoundError,
  OrderStatus,
  requireAuth,
  UnauthorizedError,
} from "@sapienslabs/ticketing-common";
import express, { Request, Response } from "express";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    // Get order from the database
    const order = await Order.findById(req.params.id).populate("ticket");
    // mark as cancelled
    if (order) {
      // make sure the order belongs to the current user
      if (order.userId !== req.currentUser!.id) {
        throw new UnauthorizedError();
      }
      order.set({ status: OrderStatus.Cancelled });
      await order.save();
      new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
          id: order.ticket.id,
        },
      });
      res.status(204).send(order);
    } else {
      throw new NotFoundError();
    }
  }
);

export { router as deleteOrderRouter };
