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

  // Get all category
  describe("GET category /category/all", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/category/all")
        // .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Get category by Id
  describe("GET category /category/:id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/category/get/:id")
        // .set("token", `Bearer ${accessToken}`)
        .send({
          _id: "1",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Create new category
  describe("POST category /category/new", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/category/new")
        .set("token", `Bearer ${accessToken}`)
        .send({
          name: "Category Test Create",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Update category by id
  describe("PUT category /category/edit/:id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .put("/category/edit/:id")
        .set("token", `Bearer ${accessToken}`)
        .send({
          _id: "1",
          name: "Category Test Update",
        })

        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Search category by name
  describe("Search category with name", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/category/all?name=a&pageSize=10&pageIndex=1")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });
});
