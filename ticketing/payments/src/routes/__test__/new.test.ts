import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order } from "../../models/order";
import { OrderStatus } from "@sapienslabs/ticketing-common";

//jest.mock("../../stripe");
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

it("returns 404 if order does not exists", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "adsd",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns 401 if order does not belongs to user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "adsd",
      orderId: order.id,
    })
    .expect(401);
});

it("returns 400 if order is cancelled", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 10,
    status: OrderStatus.Cancelled,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(order.userId))
    .send({
      token: "adsd",
      orderId: order.id,
    })
    .expect(400);
});

it("returns a 201 with valid inpunts", async () => {
  const price = Math.floor(Math.random() * 100000);
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: price,
    status: OrderStatus.Created,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(order.userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  const { data: charges } = await stripe.charges.list({ limit: 1 });
  const stripeCharge = charges.find((charge) => charge.amount === price * 100);
  console.log(stripeCharge);
  expect(stripeCharge).toBeDefined();
  expect(stripeCharge!.currency).toEqual("usd");

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id,
  });
  expect(payment).not.toBeNull();
  expect(payment!.stripeId).toEqual(stripeCharge?.id);
});
