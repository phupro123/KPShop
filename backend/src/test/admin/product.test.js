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

  // Get all product
  describe("GET product /product/all", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/product/all")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Get product by Id
  describe("GET product /product/:_id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/product/get/:id")
        .set("token", `Bearer ${accessToken}`)
        .send({
          _id: "39",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Create new product
  describe("POST product /product/new", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/product/new")
        .set("token", `Bearer ${accessToken}`)
        .send({
          brand: "Acer",
          category: "Laptop",
          discount: "0.15",
          info: "Phá cách với diện mạo mạnh mẽ đến từ laptop Acer Nitro 5 Gaming AN515 45 R6EV R5 5600H (NH.QBMSV.006) mang đến cho người dùng hiệu năng ổn định, hỗ trợ bạn trong mọi tác vụ hằng ngày hay chiến những trận game cực căng một cách mượt mà.",
          price: 22490000,
          promotion: "",
          tag: "Ưu đãi sinh nhật",
          title: "Product Test",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Update product by id
  describe("PUT product /product/edit/:id", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .put("/product/edit/:id")
        .set("token", `Bearer ${accessToken}`)
        .send({
          _id: 39,
          amount: "",
          brand: "Acer",
          category: "Laptop",
          discount: "0.15",
          info: "Phá cách với diện mạo mạnh mẽ đến từ laptop Acer Nitro 5 Gaming AN515 45 R6EV R5 5600H (NH.QBMSV.006) mang đến cho người dùng hiệu năng ổn định, hỗ trợ bạn trong mọi tác vụ hằng ngày hay chiến những trận game cực căng một cách mượt mà.",
          price: 22490000,
          promotion: "",
          tag: "Ưu đãi sinh nhật",
          title: "Acer Nitro 5 Gaming AN515 45 R6EV R5 NH.QBMSV.006",
        })
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  // Search product by title
  describe("Search product with title", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/product/all?title=a&pageSize=10&pageIndex=1")
        .set("token", `Bearer ${accessToken}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });
});
