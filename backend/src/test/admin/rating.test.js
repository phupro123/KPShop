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

  // Get all rating
  describe("GET rating /rating/all", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/rating/all")
        // .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });
});
