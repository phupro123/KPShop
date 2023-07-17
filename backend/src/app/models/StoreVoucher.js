const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StroreVoucher = new Schema(
  {
    voucherId: {  type: String},
    uid:{type:String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("StroreVoucher", StroreVoucher);

