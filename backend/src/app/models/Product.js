const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const Category = require("./Category");
const Brand = require("./Brand");

mongoose.plugin(slug);
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const Product = new Schema(
  {
    _id: { type: String },
    title: { type: String },
    price: { type: Number },
    info: { type: String },
    gallery: [],
    img: {
      type: String,
      default: "",
    },
    promotion: { type: String },
    discount: { type: String },
    tag: { type: String },
    star: { type: Number, default: "" },
    totalVote: { type: String, default: "" },
    amount: { type: String, default: "" },
    status: { type: String, default: "" },
    categoryId: { type: String, ref: Category },
    category: {},
    brandId: { type: String, ref: Brand },
    brand: {},
    parameter: {},
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  { _id: false, timestamps: true }
);
Product.index({ title: "text" });

//Product.plugin(AutoIncrement,);
module.exports = mongoose.model("Product", Product);
