const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blacklist = new Schema(
    {
        uid: {type: String,  required: true},
       
        createdAt: { type: Date, default: Date.now, index: { expires: 10800 } }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blacklist", Blacklist);