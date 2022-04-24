import request from "supertest";
import { app } from "../../app";

it("Should return all tickets", async () => {
  await request(app)
    .post("/api/tickets/")
    .set("Cookie", global.signin())
    .send({ title: "A title 1", price: 20 });

  await request(app)
    .post("/api/tickets/")
    .set("Cookie", global.signin())
    .send({ title: "A title 2", price: 20 });

  const response = await request(app).get("/api/tickets/").send();

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(2);
  expect(response.body[0].title).toEqual("A title 1");
  expect(response.body[1].title).toEqual("A title 2");
});
