var express = require("express");
var router = express.Router();
const authController = require("../../app/controllers/common/AuthController");
const {verifyToken} = require("../../app/controllers/common/verifyController.js");
const passport = require("passport");
const URL = "http://localhost:3000/"
// const URL = "https://kpshop-client.vercel.app/"
//REGISTER NORMAL
router.post("/register", authController.register);
//LOGIN NORMAL

router.post("/login", authController.login);

router.post("/loginAdmin", authController.loginAdmin);

//LOGOUT PASSPORT
router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.status(200).json("")
  });
  
});
//LOG OUT
router.post("/logout", authController.logOut);

//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
// RETURN USER INFO
router.get("/login/success", authController.loginSuccess);

// GOOGLE LOGIN
router.get('/connect/google/:userId/:connect', (req, res,next) => {
 
  passport.authenticate('google',  { scope: ["profile", "email"],state: JSON.stringify(req.params), }
  )(req, res, next);
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: URL,
    failureRedirect: URL,
  })
);

// FB LOGIN
router.get('/connect/facebook/:userId/:connect', (req, res,next) => {
 
  passport.authenticate('facebook',  { scope: ["public_profile"],state: JSON.stringify(req.params), }
  )(req, res, next);
});

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: URL,
    failureRedirect: URL,
  })
);

// PHONE LOGIN 
router.post("/phone/signup", authController.signup);

router.post("/phone/verify", authController.verifyOTP);

router.post("/loginSucessPhone", authController.loginSuccessPhone);


module.exports = router;
