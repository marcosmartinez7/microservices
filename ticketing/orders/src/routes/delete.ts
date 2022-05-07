import {
  NotFoundError,
  OrderStatus,
  requireAuth,
  UnauthorizedError,
} from "@sapienslabs/ticketing-common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    // Get order from the database
    const order = await Order.findById(req.params.id);
    // mark as cancelled
    if (order) {
      // make sure the order belongs to the current user
      if (order.userId !== req.currentUser!.id) {
        throw new UnauthorizedError();
      }
      order.set({ status: OrderStatus.Cancelled });
      await order.save();
      res.status(204).send(order);
    } else {
      throw new NotFoundError();
    }
  }
);

export { router as deleteOrderRouter };
