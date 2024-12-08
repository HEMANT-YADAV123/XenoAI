const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const {
  textGenerationController,summaryController,chatbotController,
  englishToJSController,scifiImageController
} = require("../controller/openiaController");

const router = express.Router();

//route
router.post("/generate-text", protect, textGenerationController);
router.post("/summary", protect, summaryController);
router.post("/chatbot", protect, chatbotController);
router.post("/js-converter", protect, englishToJSController);
router.post("/scifi-image", protect, scifiImageController);

module.exports = router;