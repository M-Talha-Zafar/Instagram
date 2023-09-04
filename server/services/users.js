const User = require("../models/user");
const upload = require("../utilities/upload-image");
const mongoose = require("mongoose");

const UserService = {
  getAll: () => User.find(),

  getById: (id) => User.findById(id).populate("posts"),

  getStoryPictures: async (userId) => {
    const user = await User.findById(userId).populate(
      "following",
      "username profilePicture stories"
    );

    const currentUserInfo = {
      _id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      stories: user.stories,
    };

    return [currentUserInfo, ...user.following];
  },

  getByUsername: (username) =>
    User.findOne({ username: username }).populate("posts"),

  create: (userData) => User.create(userData),

  updateById: async (id, updatedData, image) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (image) {
        const url = await upload(image);
        updatedData.profilePicture = url;
      }
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
        session,
      });

      await session.commitTransaction();
      session.endSession();

      return updatedUser;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error.message);
      throw new Error("An error occurred while updating the user");
    }
  },

  deleteById: (id) => User.findByIdAndDelete(id),

  searchUser: async (searchTerm) => {
    const regex = new RegExp(searchTerm, "i");
    return User.find({ username: regex });
  },

  getFollowers: async (userId) => {
    const user = await User.findById(userId).populate(
      "followers",
      "username profilePicture"
    );

    return user.followers;
  },

  getFollowing: async (userId) => {
    const user = await User.findById(userId).populate(
      "following",
      "username profilePicture"
    );

    return user.following;
  },

  getRequests: async (userId) => {
    const user = await User.findById(userId).populate("requests");
    return user.requests;
  },

  sendFollowRequest: async (senderId, recipientId) => {
    const recipient = await User.findByIdAndUpdate(
      recipientId,
      { $addToSet: { requests: senderId } },
      { new: true }
    );

    return recipient;
  },

  addFollower: async (senderId, recipientId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const sender = await User.findById(senderId);
      const recipient = await User.findById(recipientId).populate("posts");

      if (!sender || !recipient) {
        throw new Error("Sender or recipient not found");
      }

      if (!recipient.followers.includes(senderId)) {
        recipient.followers.push(senderId);
        await recipient.save({ session });
      }

      if (!sender.following.includes(recipientId)) {
        sender.following.push(recipientId);
        await sender.save({ session });
      }

      await session.commitTransaction();
      session.endSession();

      return recipient;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error.message);
      throw new Error("An error occurred while adding a follower");
    }
  },

  acceptFollowRequest: async (userId, friendId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { requests: friendId },
          $addToSet: { followers: friendId },
        },
        { new: true, session }
      );

      await User.findByIdAndUpdate(
        friendId,
        { $addToSet: { following: userId } },
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      return user;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error.message);
      throw new Error("An error occurred while accepting a follow request");
    }
  },

  unfollowUser: async (userId, unfollowId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { following: unfollowId } },
        { new: true, session }
      );

      const user = await User.findByIdAndUpdate(
        unfollowId,
        { $pull: { followers: userId } },
        { new: true, session }
      ).populate("posts");

      await session.commitTransaction();
      session.endSession();

      return user;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error.message);
      throw new Error("An error occurred while unfollowing a user");
    }
  },

  deleteFollowRequest: async (userId, unfollowId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updatedUser = await User.findByIdAndUpdate(
        unfollowId,
        { $pull: { requests: userId } },
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      return updatedUser;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error.message);
      throw new Error("An error occurred while deleting a follow request");
    }
  },
};

module.exports = UserService;
