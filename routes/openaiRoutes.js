const express = require("express");
const {
  textGenerationController,summaryController,chatbotController,
  englishToJSController,scifiImageController
} = require("../controller/openiaController");

const router = express.Router();

//route
router.post("/generate-text", textGenerationController);
router.post("/summary", summaryController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", englishToJSController);
router.post("/scifi-image", scifiImageController);

module.exports = router;