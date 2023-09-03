const storyFlushQueue = require("../jobs/story");
const { TimeIntervals } = require("../constants/constants");
const Story = require("../models/story");
const User = require("../models/user");
const upload = require("../utilities/upload-image");

const StoryService = {
  create: async (userId, image) => {
    const url = await upload(image);

    const newStory = new Story({
      user: userId,
      image: url,
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
  },

  deleteById: async (storyId) => {
    const story = await Story.findOne({ _id: storyId });

    if (!story) {
      throw new Error("Story not found");
    }

    await User.findByIdAndUpdate(story.user._id, {
      $pull: { stories: storyId },
    });

    const deletedStory = await Story.findByIdAndDelete(storyId);

    return deletedStory;
  },

  getAllByUserId: async (userId) => {
    return Story.find({ user: userId }).populate("user");
  },
};

module.exports = StoryService;
