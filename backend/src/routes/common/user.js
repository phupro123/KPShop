var express = require("express");
var router = express.Router();

const userController = require("../../app/controllers/common/UserController.js");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../app/controllers/common/verifyController.js");


router.get("/all", verifyTokenAndAdmin, userController.getAllUser);

router.delete("/delete/:id", verifyTokenAndAdmin,userController.deleteUser);

router.get("/get/:id", verifyTokenAndAdmin, userController.getUser);

router.put("/edit/:id",verifyTokenAndUserAuthorization,userController.update);

router.post("/new",verifyTokenAndAdmin, userController.newUser);

router.put("/editPass/:id",verifyTokenAndUserAuthorization, userController.updatePass);

router.post("/getWishList/:id",verifyTokenAndUserAuthorization, userController.getWishList);

router.post("/addToWishList/:id",verifyTokenAndUserAuthorization, userController.addToWishlist);

router.put("/pushAddress/:id",verifyTokenAndUserAuthorization, userController.pushAddress);

router.put("/popAddress/:id",verifyTokenAndUserAuthorization, userController.popAddress);

router.put("/editAddress/:id",verifyTokenAndUserAuthorization, userController.editAddress);

router.put("/editPhone/:id",verifyTokenAndUserAuthorization, userController.editPhone);

router.post("/checkMail/:id",verifyTokenAndUserAuthorization, userController.checkEmail);

router.post("/checkPassword/:id",verifyTokenAndUserAuthorization, userController.checkPassword);

router.post("/checkPhone/:id",verifyTokenAndUserAuthorization, userController.checkPhone);

// GET LENGTH
// router.get("/getLength", userController.getUserLength);
module.exports = router;
