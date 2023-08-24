const Story = require("../models/story");
const User = require("../models/user");

const StoryController = {
  create: async (userId, image) => {
    try {
      const newStory = new Story({
        user: userId,
        image: image,
      });
      await newStory.save();

      await User.findByIdAndUpdate(userId, {
        $push: { stories: newStory._id },
      });

      return newStory;
    } catch (error) {
      throw new Error("An error occurred while creating the story");
    }
  },

  getAllByUserId: async (userId) => {
    try {
      const stories = await Story.find({ user: userId }).populate("user");
      return stories;
    } catch (error) {
      throw new Error("An error occurred while fetching stories");
    }
  },
};

module.exports = StoryController;
