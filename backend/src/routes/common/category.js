var express = require("express");
var router = express.Router();
const {
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
  } = require("../../app/controllers/common/verifyController.js");
const categoryController = require("../../app/controllers/common/CategoryController.js");

router.get("/all", categoryController.getAllCategory);

router.delete("/delete/:id",verifyTokenAndAdmin, categoryController.deleteCategory);

router.get("/get/:id", categoryController.getCategory);

router.put("/edit/:id", verifyTokenAndAdmin,categoryController.update);

router.post("/new", verifyTokenAndAdmin,categoryController.newCategory);

module.exports = router;
