const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Voucher = new Schema(
  {
    voucherId: {  type: String},
    name: { type: String, },
    title:{type:String},
    sale: { type: String },
    quantity:{type:String},
    redeemUse: {type: String},
    condition:{type:String},
    expiredDate: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", Voucher);

