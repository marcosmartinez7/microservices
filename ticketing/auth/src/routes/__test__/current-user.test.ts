import request from "supertest";
import { app } from "../../app";

it("responds with details of current user", async () => {
  const cookie = await global.signin();
  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.com");
});

it("responds with 401 if not auth", async () => {
  await request(app).get("/api/users/currentuser").send().expect(401);
});
