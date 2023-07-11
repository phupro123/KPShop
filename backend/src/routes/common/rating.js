var express = require("express");
var router = express.Router();

const ratingController = require("../../app/controllers/common/RatingController.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndSeller,
} = require("../../app/controllers/common/verifyController.js");

//GET RaTING PAGING
router.get("/paging/:id", ratingController.getRatingPage);

//GET ALL RATING
router.get("/all", ratingController.getAllRating);

//DELETE A RATING
router.delete("/delete/:id", ratingController.deleteRating);

//GET All RAING BY PRODUCT
router.get("/get/product/:id", ratingController.getRatingByProduct);

//EDIT A RATING
router.put("/edit/:id", ratingController.updateRating);

//ADD DISCUSS
router.put("/:id/addDiscuss", ratingController.addDiscussRating);

//NEW RATING
router.post("/new", ratingController.newRating);

module.exports = router;
