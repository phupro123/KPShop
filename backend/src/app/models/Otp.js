const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Otp = new Schema(
    {
        phone: {type: String,  required: true},
        otp: {   type: String,  required: true},
        createdAt: { type: Date, default: Date.now, index: { expires: 300 } }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Otp", Otp);