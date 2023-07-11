var express = require("express");
var router = express.Router();

const userController = require("../../app/controllers/common/UserController.js");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../app/controllers/common/verifyController.js");


//ALL USERS
router.get("/all", verifyTokenAndAdmin, userController.getAllUser);

//DELETE USER
router.delete("/delete/:id", verifyTokenAndAdmin,userController.deleteUser);

//GET 1 USER
router.get("/get/:id", verifyTokenAndAdmin, userController.getUser);

//EDIT 1 USER
router.put("/edit/:id", verifyTokenAndAdmin,userController.update);

// NEW USER
router.post("/new",verifyTokenAndAdmin, userController.newUser);
//GET 1 PASS USER
router.put("/editPass/:id", userController.updatePass);

// GET LENGTH
router.get("/getLength", userController.getUserLength);

router.post("/addToWishList", userController.addToWishlist);

router.put("/pushAddress/:id", userController.pushAddress);

router.put("/popAddress/:id", userController.popAddress);

router.put("/editAddress/:id", userController.editAddress);

router.put("/editPhone/:id", userController.editPhone);

router.put("/checkMail", userController.checkEmail);

router.post("/getWishList", userController.getWishList);

module.exports = router;
