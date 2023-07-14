const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./Product");
// const slug = require("mongoose-slug-generator");
// mongoose.plugin(slug);

const User = new Schema(
  {
    userId: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    verifyMail: {
      type: Boolean,
      default: false,
    },
    verifyPhone: {
      type: Boolean,
      default: false,
    },
    fbId: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "1",
    },
    fullname: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    birthdate: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    status: {
      type: Boolean,
      default: false,
    },
    // 0 ban
    // 1 active
    address: [],
    wishlist: [{ type: String, ref: Product }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
