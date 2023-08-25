const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/stories");

router.post("/", async (req, res) => {
  const { userId, image } = req.body;
  console.log("Recieved request...");
  try {
    const newStory = await StoryController.create(userId, image);
    res.status(201).json(newStory);
  } catch (error) {
    res.status(400).json({ message: "Failed to create story." });
  }
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const stories = await StoryController.getAllByUserId(userId);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/add-images/:storyId", async (req, res) => {
  const { storyId } = req.params;
  const { imageArray } = req.body;
  try {
    const updatedStory = await StoryController.addImagesToStory(
      storyId,
      imageArray
    );
    res.json(updatedStory);
  } catch (error) {
    res.status(400).json({ message: "Failed to add images to story." });
  }
});

module.exports = router;
