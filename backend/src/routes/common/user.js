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
router.put("/edit/:id",verifyTokenAndUserAuthorization,userController.update);

// NEW USER
router.post("/new",verifyTokenAndAdmin, userController.newUser);
//GET 1 PASS USER
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
