const Story = require("../../models/story");

const storyAuth = async (req, res, next) => {
  const storyId = req.params.id;
  const userId = req.user._id;

  try {
    const story = await Story.findById(storyId);

    if (!story) {
      res.status(404).json({ message: "Story not found" });
      return;
    }

    if (!story.user.equals(userId)) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = storyAuth;
