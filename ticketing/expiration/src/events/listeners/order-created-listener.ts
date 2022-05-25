import {
  Subjects,
  Listener,
  OrderCreatedEvent,
} from "@sapienslabs/ticketing-common";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    const { id, status } = data;

    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Order not found!");
    }

    order.set({ status });

    await order.save();

    msg.ack();
  }
}
