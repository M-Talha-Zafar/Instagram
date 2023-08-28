const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/stories");
const storyAuth = require("../middlewares/stories/authorization");

router.post("/", async (req, res) => {
  const { userId, image } = req.body;
  try {
    const newStory = await StoryController.create(userId, image);
    res.status(201).json(newStory);
  } catch (error) {
    res.status(400).json({ message: "Failed to create story." });
  }
});

router.delete("/:id", storyAuth, async (req, res) => {
  const storyId = req.params.id;
  try {
    const deletedStory = await StoryController.deleteById(storyId);
    res.status(201).json(deletedStory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to delete story." });
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

module.exports = router;
