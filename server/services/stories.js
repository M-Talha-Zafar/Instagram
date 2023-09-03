const storyFlushQueue = require("../jobs/story");
const { TimeIntervals } = require("../constants/constants");
const Story = require("../models/story");
const User = require("../models/user");
const upload = require("../utilities/upload-image");
const mongoose = require("mongoose");

const StoryService = {
  create: async (userId, image) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const url = await upload(image);

      const newStory = new Story({
        user: userId,
        image: url,
      });

      await newStory.save({ session });

      await User.findByIdAndUpdate(
        userId,
        {
          $push: { stories: newStory._id },
        },
        { session }
      ).lean();

      await storyFlushQueue.add(
        "flush-story",
        { storyId: newStory._id },
        { delay: TimeIntervals.ONE_DAY }
      );

      await session.commitTransaction();
      session.endSession();

      return newStory;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error.message);
      throw new Error("An error occurred while creating the story");
    }
  },

  deleteById: async (storyId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const story = await Story.findOne({ _id: storyId }).session(session);

      if (!story) {
        throw new Error("Story not found");
      }

      await User.findByIdAndUpdate(
        story.user._id,
        {
          $pull: { stories: storyId },
        },
        { session }
      );

      const deletedStory = await Story.findByIdAndDelete(storyId).session(
        session
      );

      await session.commitTransaction();
      session.endSession();

      return deletedStory;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error.message);
      throw new Error("An error occurred while deleting the story");
    }
  },

  getAllByUserId: async (userId) => {
    return Story.find({ user: userId }).populate("user");
  },
};

module.exports = StoryService;
