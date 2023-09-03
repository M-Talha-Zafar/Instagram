const storyFlushQueue = require("../jobs/story");
const { TimeIntervals } = require("../constants/constants");
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
      }).lean();

      await storyFlushQueue.add(
        "flush-story",
        { storyId: newStory._id },
        { delay: TimeIntervals.ONE_DAY }
      );

      return newStory;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while creating the story");
    }
  },

  deleteById: async (storyId) => {
    try {
      const story = await Story.findOne({ _id: storyId });

      if (!story) {
        throw new Error("Story not found");
      }

      await User.findByIdAndUpdate(story.user._id, {
        $pull: { stories: storyId },
      });

      const deletedStory = await Story.findByIdAndDelete(storyId);

      return deletedStory;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while deleting the story");
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
