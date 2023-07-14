var express = require("express");
var router = express.Router();

const ratingController = require("../../app/controllers/common/RatingController.js");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization
} = require("../../app/controllers/common/verifyController.js");

//GET RaTING PAGING
router.get("/paging/:id", ratingController.getRatingPage);

//GET ALL RATING
router.get("/all", ratingController.getAllRating);

//DELETE A RATING
router.delete("/delete/:id",verifyTokenAndAdmin, ratingController.deleteRating);

//GET All RAING BY PRODUCT
router.get("/get/product/:id", ratingController.getRatingByProduct);

//EDIT A RATING
router.put("/edit/:id",verifyTokenAndAdmin, ratingController.updateRating);

//ADD DISCUSS
router.put("/:rid/addDiscuss/:id",verifyTokenAndUserAuthorization, ratingController.addDiscussRating);

//NEW RATING
router.post("/new/:id", verifyTokenAndUserAuthorization,ratingController.newRating);

module.exports = router;
