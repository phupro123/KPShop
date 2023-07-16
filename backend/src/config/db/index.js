const mongoose = require("mongoose");

//const dotenv = require('dotenv')
//dotenv.config();

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://huynhlaiphu2001:123@web.hbx7r.mongodb.net/PKShop?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    // console.log("Ok Connected to mongose");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
