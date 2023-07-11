var express = require("express");
var router = express.Router();

const uploadImage = require("../../services/uploadImage.js");
const MailController= require("../../services/mail.js")
const ChatController = require("../../services/chat.js")

router.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
      .then((url) => res.send(url))
      .catch((err) => res.status(500).send(err));
  });
  
router.post("/uploadMultipleImages", (req, res) => {
    uploadImage
      .uploadMultipleImages(req.body.images)
      .then((urls) => res.send(urls))
      .catch((err) => res.status(500).send(err));
});

router.post("/sentEmail", (req, res) => {
  MailController.sentEmail()
  .then(response => res.send(response.message))
  .catch(error => res.status(500).send(error.message))
});
router.post("/changeEmail",  MailController.changeEmail);

router.post("/verifyChangeEmail",  MailController.verifyOTP);

router.post("/forgetPassword",  MailController.forgetPass);

router.post("/sucessOrder",  MailController.orderSucess);

router.post("/editForgetPassword",  MailController.editForgetPass);

router.get("/webhook",ChatController.getWebhook);

router.post("/webhook",ChatController.postWebhook);

router.post("/setup",ChatController.handleSetupProfileAPI);

module.exports = router;
