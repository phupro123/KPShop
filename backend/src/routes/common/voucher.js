var express = require("express");
var router = express.Router();
const {
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization
  } = require("../../app/controllers/common/verifyController.js");
const voucherController = require("../../app/controllers/common/VoucherController.js");

router.get("/all", verifyTokenAndAdmin,voucherController.getAllVoucher);

router.delete("/delete/:id",verifyTokenAndAdmin, voucherController.deleteVoucher);

router.get("/get/:id", verifyTokenAndAdmin,voucherController.getVoucher);

router.put("/edit/:id", verifyTokenAndAdmin,voucherController.update);

router.post("/new", verifyTokenAndAdmin,voucherController.newVoucher);

router.post("/checkVoucher", voucherController.checkVoucher);

module.exports = router;
