const authRouter = require("./common/auth");
const userRouter = require("./common/user");
const productRouter = require("./common/product");
const orderRouter = require("./common/order");
const paymentRouter = require("./common/payment");
const ratingRouter = require("./common/rating");
const voucherRouter = require("./common/voucher");
const brandRouter = require("./common/brand");
const categoryRouter = require("./common/category");
const servicesRouter = require("./common/services");

function route(app) {
  app.use("/auth", authRouter);

  app.use("/user", userRouter);

  app.use("/product", productRouter);

  app.use("/order", orderRouter);


  app.use("/rating", ratingRouter);

  app.use("/voucher", voucherRouter);

  app.use("/payment", paymentRouter);

  app.use("/brand", brandRouter);

  app.use("/category", categoryRouter);

  app.use("/services",servicesRouter)
}

module.exports = route;
