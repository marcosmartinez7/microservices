import { OrderStatus } from "@sapienslabs/ticketing-common";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("marks an order as Cancelled", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();
  // make a request to build an order with this ticket
  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .expect(204);
  // make sure the order is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
