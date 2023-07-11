const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const db = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const passportSetup = require("./services/passport");
const passport = require("passport");

const session = require('express-session')
// const MongoStore = require('connect-mongo');
//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "25mb" }));

// HTTP logger
app.use(morgan("combined"));

// DB
db.connect();

// app.set('trust proxy', 1);

// app.use(session({
//   secret: 'foo',
//   resave: true,
//   saveUninitialized: false,
//   // store: MongoStore.create({
//   //   mongoUrl: "mongodb+srv://huynhlaiphu2001:123@web.hbx7r.mongodb.net/PKShop?retryWrites=true&w=majority",
   
//   //   stringify: false,
//   // }),
//   cookie: {
//     maxAge: 20*1000,
//     secure:true,
//     httpOnly:true,
//     sameSite:"none"
//   }
// }));

app.use(session({
  secret: 'somethingsecretgoeshere',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 20 * 1000
},
}));
app.use(passport.initialize());
app.use(passport.session());


//Cookie
app.use(cors({
  origin: ["http://localhost:8000","http://localhost:3000","http://127.0.0.1:3000","http://localhost:4000","http://127.0.0.1:4000","https://kpshop-backend.onrender.com","https://kpshop-admin.vercel.app","https://kpshop-client.vercel.app"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
app.use(cookieParser());




// Routes init
route(app);

app.listen(8000, () => {
  console.log(`App listening on port 8000`);
});