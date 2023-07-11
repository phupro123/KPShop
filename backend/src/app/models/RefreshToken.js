const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshToken = new Schema(
  {
    name: { type: String },
    userId: {type:String},
    createdAt: { type: Date, default: Date.now, index: { expires: 86400 } }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RefreshToken", RefreshToken);
