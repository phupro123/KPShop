const request = require("supertest");
const app = require("../../index"); // Đây là file chứa Express app của bạn

describe("POST Login", () => {
  let accessToken;

  it("should return a JWT token if the credentials are correct", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "buapro874@gmail.com", password: "123" })
      .expect(200);
    accessToken = response.body.accessToken;
    expect(response.body.accessToken).toBeDefined();
  });

  it("should return 404 if account not exist", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "wrongusername", password: "wrongpassword" })
      .expect(404);

    expect(response.body).toBe("Incorrect username");
  });

  describe("Change password", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .put("/user/editPass/6360c477323aa241380d7be3")
        .set("token", `Bearer ${accessToken}`)
        .send({
          oldPassword: "123",
          password: "123456",
        })
        .expect(200);
      // expect(response.body).toBe("Change password successfully");
    });
  });

  describe("Change password again", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .put("/user/editPass/6360c477323aa241380d7be3")
        .set("token", `Bearer ${accessToken}`)
        .send({
          oldPassword: "123456",
          password: "123",
        })
        .expect(200);
      // expect(response.body).toBe("Change password successfully");
    });
  });
});
