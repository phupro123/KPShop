var express = require("express");
var router = express.Router();

const OrderController = require("../../app/controllers/common/OrderController.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndSeller,
} = require("../../app/controllers/common/verifyController.js");

//local/order/all
//GET ALL USERS
router.get(
  "/getseller/:id",
  verifyTokenAndSeller,
  OrderController.getAllorderByIdSeller
);

// tat ca Order 1 ng
router.get("/getbyid/:id", OrderController.getAllorderById);



router.get("/all", OrderController.getAllorder);

//DELETE USER
router.delete(
  "/delete/:id",
  verifyTokenAndUserAuthorization,
  OrderController.deleteorder
);

router.get(
  "/get/:id",
  verifyTokenAndUserAuthorization,
  OrderController.getorder
);

router.put("/edit/:id", OrderController.update);

router.post("/new", OrderController.neworder);



router.get("/getLength", OrderController.getorderLength);

module.exports = router;
