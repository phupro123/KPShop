var express = require("express");
var router = express.Router();

const categoryController = require("../../app/controllers/common/CategoryController.js");

router.get("/all", categoryController.getAllCategory);

router.delete("/delete/:id", categoryController.deleteCategory);

router.get("/get/:id", categoryController.getCategory);

router.put("/edit/:id", categoryController.update);

router.post("/new", categoryController.newCategory);

module.exports = router;
