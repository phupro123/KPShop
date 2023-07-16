const request = require("supertest");
const app = require("../../app");

describe("POST Login", () => {
  let accessToken;

  it("should return a JWT token if the credentials are correct", async () => {
    const response = await request(app)
      .post("/auth/loginAdmin")
      .send({ username: "admin@gmail.com", password: "123" })
      .expect(200);
    accessToken = response.body.accessToken;
    expect(response.body.accessToken).toBeDefined();
  });

  it("should return 404 if account not exist", async () => {
    const response = await request(app)
      .post("/auth/loginAdmin")
      .send({ username: "wrongusername", password: "wrongpassword" })
      .expect(404);

    expect(response.body).toBe("Incorrect username");
  });

  // Get all user
  describe("GET user /user/all", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/user/all")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Get user by Id
  describe("GET user /user/:id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/user/get/:id")
        .set("token", `Bearer ${accessToken}`)
        .send({
          _id: "64a57f4558c9e9409ea3e623",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Search user by fullname
  describe("Search user with fullname", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/user/all?fullname=a&pageSize=10&pageIndex=1")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });
});
