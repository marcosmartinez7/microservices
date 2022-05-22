import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
jest.mock("../../nats-wrapper");

it("404 if id not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: 20,
    });

  expect(response.status).toEqual(404);
});

it("401 if not auth", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).put(`/api/tickets/${id}`).send({
    title: "asdasd",
    price: 20,
  });

  expect(response.status).toEqual(401);
});

it("401 if user not own ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asd",
      price: 20,
    });

  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: 20,
    });

  expect(updateResponse.status).toEqual(401);
});

it("400 if invalid params", async () => {
  const updateResponse = await request(app)
    .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: -20,
    });
  expect(updateResponse.status).toEqual(400);
});

it("200 update correctly", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asd",
      price: 20,
    });

  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "asdasd",
      price: 20,
    });

  expect(updateResponse.status).toEqual(200);
  expect(updateResponse.body.title).toEqual("asdasd");
});

it("should publish an event", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asd",
      price: 20,
    });

  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "asdasd",
      price: 20,
    });

  expect(updateResponse.status).toEqual(200);
  expect(updateResponse.body.title).toEqual("asdasd");

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("should reject updates if the ticket is reserved", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asd",
      price: 20,
    });

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "asdasd",
      price: 20,
    });

  expect(updateResponse.status).toEqual(400);
});
