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

  // Get all brand
  describe("GET brand /brand/all", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/brand/all")
        // .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Get brand by Id
  describe("GET brand /brand/:id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/brand/get/:id")
        // .set("token", `Bearer ${accessToken}`)
        .send({
          _id: "1",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Create new brand
  describe("POST brand /brand/new", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/brand/new")
        .set("token", `Bearer ${accessToken}`)
        .send({
          category: "Phone",
          name: "Brand Test Create",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Update brand by id
  describe("PUT brand /brand/edit/:id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .put("/brand/edit/:id")
        .set("token", `Bearer ${accessToken}`)
        .send({
          _id: "1",
          category: "Phone",
          name: "Brand Test Update",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Search brand by name
  describe("Search brand with name", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/brand/all?name=a&pageSize=10&pageIndex=1")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });
});
