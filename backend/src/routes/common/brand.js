var express = require("express");
var router = express.Router();

const brandController = require("../../app/controllers/common/BrandController.js");

router.get("/all", brandController.getAllBrand);

router.delete("/delete/:id", brandController.deleteBrand);

router.get("/get/:id", brandController.getBrand);

router.get("/get/category/:id", brandController.getBrandByCategory);

router.put("/edit/:id", brandController.update);

router.post("/new", brandController.newBrand);

module.exports = router;
