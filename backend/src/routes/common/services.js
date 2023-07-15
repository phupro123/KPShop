var express = require("express");
var router = express.Router();

const uploadImage = require("../../services/uploadImage.js");
const MailController= require("../../services/mail.js")
const ChatController = require("../../services/chat.js")
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../../app/controllers/common/verifyController.js");
//TEST
router.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
      .then((url) => res.send(url))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)});
  });


router.post("/uploadMultipleImages", (req, res) => {
    uploadImage
      .uploadMultipleImages(req.body.images)
      .then((urls) => res.send(urls))
      .catch((err) => res.status(500).send(err));
});

//TEST 
router.post("/sentEmail", (req, res) => {
  MailController.sentEmail()
  .then(response => res.send(response.message))
  .catch(error => res.status(500).send(error.message))
});

// Cập nhật mail
router.post("/changeEmail/:id",verifyTokenAndUserAuthorization,  MailController.changeEmail);

router.post("/verifyChangeEmail/:id",verifyTokenAndUserAuthorization,  MailController.verifyOTP);

// Quên Pass
router.post("/forgetPassword/:id",verifyTokenAndUserAuthorization,  MailController.forgetPass);

router.post("/sucessOrder/:id", verifyTokenAndUserAuthorization, MailController.orderSucess);

router.post("/editForgetPassword/:id",verifyTokenAndUserAuthorization,  MailController.editForgetPass);

// Chat bot
router.get("/webhook",ChatController.getWebhook);

router.post("/webhook",ChatController.postWebhook);

router.post("/setup",ChatController.handleSetupProfileAPI);

module.exports = router;
