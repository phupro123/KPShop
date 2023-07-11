const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Counter = new Schema(
  {
    collectionName: {
      type: String,
    },
    seq: {
      type: Number,
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", Counter);
