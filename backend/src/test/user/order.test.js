const request = require("supertest");
const app = require("../../app"); // Đây là file chứa Express app của bạn

describe("ORDER", () => {
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

  describe("NEW ORDER", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/order/new/6360c477323aa241380d7be3")
        .set("token", `Bearer ${accessToken}`)
        .send({
            
                "_id": "1688567643708",
                "customer_id": "33",
                "fullname": "Nguyễn Đàm Vĩnh Khang",
                "phone": "0772852250",
                "address": "KTX khu B",
                "receiver": "",
                "payment": {
                  "name": "cash",
                  "paid": false
                },
                "discount": "0",
                "totalPrice": 30050900,
                "totalQuantity": 5,
                "status": "Đang xử lý",
                "order_items": [
                  {
                    "amount": "",
                    "status": "",
                    "_id": "7",
                    "title": "Samsung Galaxy M33",
                    "price": 7690000,
                    "info": "Không chỉ gây ấn tượng với cộng đồng người dùng smartphone bởi mức giá bán, Samsung Galaxy M33 5G còn mang đến cho người dùng một bộ thông số kỹ thuật ấn tượng, camera độ phân giải cao cùng một thiết kế vô cùng bắt mắt, hứa hẹn mang đến những trải nghiệm sử dụng tốt nhất dành cho bạn.",
                    "gallery": [
                      "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-m33-5g-xanh-duong-1.jpg",
                      "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-m33-5g-xanh-duong-2.jpg",
                      "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-m33-5g-xanh-duong-3.jpg",
                      "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-m33-5g-xanh-duong-4.jpg",
                      "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-m33-5g-xanh-duong-5.jpg",
                      "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-m33-5g-xanh-duong-6.jpg",
                      "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-m33-5g-xanh-duong-7.jpg"
                    ],
                    "img": "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-galaxy-m33-5g-1-600x600.jpg",
                    "promotion": "",
                    "discount": "0.13",
                    "tag": "SiÊU SALE 11.11",
                    "star": 5,
                    "totalVote": "1",
                    "category": "Phone",
                    "brand": "Samsung",
                    "parameter": {
                      "Màn hình": "TFT LCD, 6.6, Full HD+",
                      "Hệ điều hành": "Android 12",
                      "Camera sau": "Chính 50 MP & Phụ 5 MP, 2 MP, 2 MP",
                      "Camera trước": "8 MP",
                      "Chip": "Exynos 1280",
                      "RAM": [
                        "6 GB",
                        "8 GB"
                      ],
                      "ROM": "64 GB",
                      "SIM": "2 Nano SIM, Hỗ trợ 5G",
                      "Pin, Sạc": "5000 mAh, 25 W"
                    },
                    "slug": "samsung-galaxy-m33",
                    "createdAt": "2022-11-11T05:09:48.890Z",
                    "updatedAt": "2023-07-02T02:51:42.855Z",
                    "__v": 0,
                    "quantity": 3
                  },
                ],
                "time": "21:07 07/05/2023",
        })
        .expect(200);
    });
    describe("CANCEL ORDER", () => {
        it("should return 200 OK", async () => {
          const response = await request(app)
            .put("/order/cancel/1688567643708/6360c477323aa241380d7be3")
            .set("token", `Bearer ${accessToken}`)
            .expect(200);
        });
      });
  });
  
  
});
describe("ORDER", () => {
    let accessToken;
  
    // Login 
    it("should return a JWT token if the credentials are correct", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ username: "admin@gmail.com", password: "123" })
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



    describe("CANCEL ORDER", () => {
      it("should return 200 OK", async () => {
        const response = await request(app)
          .delete("/order/delete/1688567643708")
          .set("token", `Bearer ${accessToken}`)
          .expect(200);
      });
    });
    
    
  });