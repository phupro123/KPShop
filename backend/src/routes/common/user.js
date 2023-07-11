var express = require("express");
var router = express.Router();

const userController = require("../../app/controllers/common/UserController.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndSeller,
} = require("../../app/controllers/common/verifyController.js");

//local/user/all
//GET ALL USERS
router.get("/all", verifyTokenAndAdmin, userController.getAllUser);

//DELETE USER
router.delete(
  "/delete/:id",

  userController.deleteUser
);

router.get("/get/:id", verifyTokenAndAdmin, userController.getUser);

router.put("/edit/:id", userController.update);

router.put("/editPass/:id", userController.updatePass);

router.get("/getLength", userController.getUserLength);

router.post("/new", userController.newUser);

router.post("/addToWishList", userController.addToWishlist);

router.put("/pushAddress/:id", userController.pushAddress);

router.put("/popAddress/:id", userController.popAddress);

router.put("/editAddress/:id", userController.editAddress);

router.put("/editPhone/:id", userController.editPhone);

router.put("/checkMail", userController.checkEmail);

router.post("/getWishList", userController.getWishList);


module.exports = router;
