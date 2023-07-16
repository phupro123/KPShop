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
// router.get(
//   "/getseller/:id",
//   verifyTokenAndSeller,
//   OrderController.getAllorderByIdSeller
// );

// tat ca Order 1 ng
router.get("/getbyid/:oid/:id",verifyTokenAndUserAuthorization, OrderController.getAllorderById);

router.get("/all",verifyTokenAndAdmin, OrderController.getAllorder);

router.delete("/delete/:id",verifyTokenAndAdmin,OrderController.deleteorder);

router.get(
  "/get/:oid/:id",
  verifyTokenAndUserAuthorization,
  OrderController.getorder
);

router.put("/cancel/:Oid/:id",verifyTokenAndUserAuthorization, OrderController.cancel);

router.put("/edit/:id",verifyTokenAndAdmin, OrderController.update);

router.post("/new/:id", verifyTokenAndUserAuthorization,OrderController.neworder);


// router.get("/getLength", OrderController.getorderLength);

module.exports = router;
