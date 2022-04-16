import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("return 404 if ticket not found", async () => {
  const response = await request(app)
    .get(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .send();

  expect(response.status).toEqual(404);
});

it("return the ticket if ticket is found", async () => {
  const response = await request(app)
    .post("/api/tickets/")
    .set("Cookie", global.signin())
    .send({ title: "A title", price: 20 });

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("A title");
  expect(ticketResponse.body.price).toEqual(20);
});
