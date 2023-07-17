const request = require("supertest");
const app = require("../../app"); // Đây là file chứa Express app của bạn

describe("Change User", () => {
  let accessToken;

  // Login 
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

  describe("Add address", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .put("/user/pushAddress/6360c477323aa241380d7be3")
        .set("token", `Bearer ${accessToken}`)
        .send({
            
                "phone": "0784125952",
                "address": "285A - 285B CMT8",
                "city": {
                  "id": 294,
                  "name": "Hồ Chí Minh"
                },
                "district": {
                  "id": 489,
                  "name": "Quận 6"
                },
                "ward": {
                  "id": 10489,
                  "name": "Phường 04"
                },
                "isDefault": true,
                "fullname": "Huỳnh Lai Phú",
                "mnemonicName": "Phú"
              
        })
        .expect(200);
    });
  });
  describe("POP ADDRESS", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .put("/user/popAddress/6360c477323aa241380d7be3")
        .set("token", `Bearer ${accessToken}`)
        .send({
            
                "phone": "0784125952",
                "address": "285A - 285B CMT8",
                "city": {
                  "id": 294,
                  "name": "Hồ Chí Minh"
                },
                "district": {
                  "id": 489,
                  "name": "Quận 6"
                },
                "ward": {
                  "id": 10489,
                  "name": "Phường 04"
                },
                "isDefault": true,
                "fullname": "Huỳnh Lai Phú",
                "mnemonicName": "Phú"
              
        })
        .expect(200);
    });
  });
  
});
