var express = require("express");
var router = express.Router();

const productController = require("../../app/controllers/common/ProductController.js");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../app/controllers/common/verifyController.js");

router.put("/edit/:id",verifyTokenAndAdmin, productController.update);

router.put("/edit/:pid/:id",verifyTokenAndUserAuthorization, productController.updateRating);

router.post("/new", verifyTokenAndAdmin,productController.newProduct);

router.delete("/delete/:id",verifyTokenAndAdmin,productController.deleteProduct);

router.get("/all", productController.getAllProduct);

router.get("/getTop5", productController.getTop5Product);

router.get("/category/:id", productController.getCategory1);

router.get("/get/:slug", productController.getProductBySlug);

router.get("/get/:_id", productController.getProductById);

router.get("/search/:name", productController.search);

router.get("/getbyseller/:id", productController.getProductBySeller);

router.get("/query", productController.queryProduct);

router.post("/queryproduct", productController.queryProductNew);

module.exports = router;
