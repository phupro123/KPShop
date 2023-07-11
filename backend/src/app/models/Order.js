const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");

const Order = new Schema(
  {
    _id: { type: String },
    customer_id: { type: String, ref: User },
    fullname: { type: String },
    phone: { type: String },
    address: { type: String },
    receiver: { type: String },
    payment: {},
    discount:{type : String},
    totalPrice: { type: Number },
    totalQuantity: {},
    status: { type: String },
    order_items: [],
    time: {},
  },
  { _id: false, timestamps: true }
);

module.exports = mongoose.model("Order", Order);
