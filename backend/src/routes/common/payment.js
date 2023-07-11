var express = require("express");
const { reqPayUrl } = require("../../services/momo");

const axios = require("axios");
var router = express.Router();

const Order = require("../../app/models/Order");

router.get("/", (req, res) => {
  res.json({ name: "momo payment" });
});

router.post("/momo/notify", async (req, res, next) => {
  const data = req.body;
  const orderId = data.orderId.split("-")[0];
  if (data.resultCode === 0) {
    try {
      await Order.updateOne(
        { _id: orderId },
        {
          payment: {
            name: "momo",
            paid: true,
          }
        }
      );
    } catch (err) {
      next(err);
    }
  }
});

router.post("/paymentUrl", (request, response) => {
  const data = request.body;
  const params = {
    ...data,
  };
  const payUrl = reqPayUrl(request, response, params);
});

module.exports = router;
