import request from "supertest";
import { app } from "../../app";

it("responds with details of current user", async () => {
  const cookie = await global.signin();
  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  console.log(res.body);
  expect(res.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not auth", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  console.log(res.body);
  expect(res.body.currentUser).toEqual(null);
});
