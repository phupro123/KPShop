var express = require("express");
var router = express.Router();

const productController = require("../../app/controllers/common/ProductController.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndSeller,
} = require("../../app/controllers/common/verifyController.js");

//GET ALL PRODUCT
router.get("/all", productController.getAllProduct);

router.get("/getTop5", productController.getTop5Product);

router.get("/category/:id", productController.getCategory1);

//DELETE USER
router.delete(
  "/delete/:id",

  productController.deleteProduct
);

router.get("/get/:slug", productController.getProductBySlug);

router.get("/get/:_id", productController.getProductById);

router.put("/edit/:id", productController.update);

router.post("/new", productController.newProduct);

router.get("/search/:name", productController.search);

router.get("/getbyseller/:id", productController.getProductBySeller);

router.get("/query", productController.queryProduct);

router.post("/queryproduct", productController.queryProductNew);
module.exports = router;
