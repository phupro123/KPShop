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

  // Get all voucher
  describe("GET voucher /voucher/all", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/voucher/all")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Get voucher by Id
  describe("GET voucher /voucher/:id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/voucher/get/:id")
        .set("token", `Bearer ${accessToken}`)
        .send({
          _id: "1",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Create new voucher
  describe("GET voucher /voucher/new", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/voucher/new")
        .set("token", `Bearer ${accessToken}`)
        .send({
          title: "Voucher Title",
          name: "Voucher Name",
          sale: 0.2,
          quantity: 10,
          expiredDate: "Wed Jul 05 2023 14:01:11 GMT+0700 (Indochina Time)",
          condition: 5000000,
          redeemUse: 1,
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Search voucher by name
  describe("Search voucher with name", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/voucher/all?name=a&pageSize=10&pageIndex=1")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });
});
