var express = require("express");
var router = express.Router();

const voucherController = require("../../app/controllers/common/VoucherController.js");

router.get("/all", voucherController.getAllVoucher);

router.delete("/delete/:id", voucherController.deleteVoucher);

router.get("/get/:id", voucherController.getVoucher);

router.put("/edit/:id", voucherController.update);

router.post("/new", voucherController.newVoucher);

router.post("/checkVoucher", voucherController.checkVoucher);

module.exports = router;
