const StoryService = require("../services/stories");

const StoryController = {
  create: async (req, res) => {
    const { userId, image } = req.body;
    try {
      const newStory = await StoryService.create(userId, image);
      res.status(201).json(newStory);
    } catch (error) {
      res.status(500).json({ message: "Failed to create story." });
    }
  },

  deleteById: async (req, res) => {
    const storyId = req.params.id;
    try {
      const deletedStory = await StoryService.deleteById(storyId);
      res.status(201).json(deletedStory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete story." });
    }
  },

  getAllByUserId: async (req, res) => {
    const userId = req.params.userId;
    try {
      const stories = await StoryService.getAllByUserId(userId);
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "An error occurred." });
    }
  },
};

module.exports = StoryController;
