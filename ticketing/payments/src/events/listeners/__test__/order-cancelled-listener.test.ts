import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
} from "@sapienslabs/ticketing-common";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCanclledListener } from "../order-cancelled-listener";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
  const listener = new OrderCanclledListener(natsWrapper.client);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
  });
  await order.save();
  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, order, data, msg };
};

it("Updates to cancelled", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);
  const order = await Order.findById(data.id);
  expect(order!.status).toEqual(OrderStatus.Cancelled);
});

it("Acks the msg", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
