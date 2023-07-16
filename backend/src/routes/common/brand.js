var express = require("express");
var router = express.Router();

const brandController = require("../../app/controllers/common/BrandController.js");
const {
  verifyTokenAndAdmin,
} = require("../../app/controllers/common/verifyController.js");

router.get("/all", brandController.getAllBrand);

router.put("/edit/:id", verifyTokenAndAdmin, brandController.update);

router.post("/new", verifyTokenAndAdmin, brandController.newBrand);

router.delete("/delete/:id", verifyTokenAndAdmin, brandController.deleteBrand);

router.get("/get/:id", brandController.getBrand);

router.get("/get/category/:id", brandController.getBrandByCategory);

module.exports = router;
