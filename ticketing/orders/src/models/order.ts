import mongoose from "mongoose";
import { OrderStatus } from "@sapienslabs/ticketing-common";
import { TicketDoc } from "./ticket";
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiredAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiredAt: Date;
  ticket: TicketDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (atrs: OrderAttrs) => {
  return new Order(atrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("order", orderSchema);

export { Order };
