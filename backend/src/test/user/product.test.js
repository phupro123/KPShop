const request = require("supertest");
const app = require("../../app"); // Đây là file chứa Express app của bạn

describe("GET PRODUCT", () => {

  it("should return a list product", async () => {
    const response = await request(app)
      .get("/product/all")
      
      .expect(200);
    
    expect(response.body).toBeDefined();
  });

});
describe("SEARCH PRODUCT", () => {

    it("should return a list product", async () => {
      const response = await request(app)
        .get("/product/search/samsung")
        
        .expect(200);
      
      expect(response.body).toBeDefined();
    });
  
  });