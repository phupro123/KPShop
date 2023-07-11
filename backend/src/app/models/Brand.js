const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");

const Brand = new Schema(
  {
    _id: { type: String },
    name: { type: String },
    categoryId: { type: String, ref: Category },
    category: {},
  },
  {
    timestamps: true,
  }
);

Brand.index({ name: "text" });

module.exports = mongoose.model("Brand", Brand);
