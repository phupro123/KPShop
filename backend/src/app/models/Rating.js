const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");
const Product = require("./Product");

const Rating = new Schema(
  {
    product_id: { type: String, ref: Product },
    product: {},
    user_id: { type: String, ref: User },
    user: {},
    content: { type: String },
    gallery: [],
    star: { type: Number },
    discuss: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", Rating);
