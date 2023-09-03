const User = require("../models/user");
const upload = require("../utilities/upload-image");

const UserService = {
  getAll: () => User.find(),

  getById: (id) => User.findById(id).populate("posts"),

  getStoryPictures: (userId) => {
    return User.findById(userId).populate(
      "following",
      "username profilePicture stories"
    );
  },

  getByUsername: (username) =>
    User.findOne({ username: username }).populate("posts"),

  create: (userData) => User.create(userData),

  updateById: async (id, updatedData, image) => {
    const url = await upload(image);
    updatedData.profilePicture = url;
    return User.findByIdAndUpdate(id, updatedData, { new: true });
  },

  deleteById: (id) => User.findByIdAndDelete(id),

  searchUser: async (searchTerm) => {
    const regex = new RegExp(searchTerm, "i");
    return User.find({ username: regex });
  },

  getFollowers: (userId) => {
    return User.findById(userId).populate(
      "followers",
      "username profilePicture"
    );
  },

  getFollowing: (userId) => {
    return User.findById(userId).populate(
      "following",
      "username profilePicture"
    );
  },

  getRequests: (userId) => {
    return User.findById(userId).populate("requests");
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
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId).populate("posts");

    if (!sender || !recipient) {
      throw new Error("Sender or recipient not found");
    }

    if (!recipient.followers.includes(senderId)) {
      recipient.followers.push(senderId);
      await recipient.save();
    }

    if (!sender.following.includes(recipientId)) {
      sender.following.push(recipientId);
      await sender.save();
    }

    return recipient;
  },

  acceptFollowRequest: async (userId, friendId) => {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { requests: friendId },
        $addToSet: { followers: friendId },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { following: userId } },
      { new: true }
    );

    return user;
  },

  unfollowUser: async (userId, unfollowId) => {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowId } },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      unfollowId,
      { $pull: { followers: userId } },
      { new: true }
    ).populate("posts");

    return user;
  },

  deleteFollowRequest: async (userId, unfollowId) => {
    const updatedUser = await User.findByIdAndUpdate(
      unfollowId,
      { $pull: { requests: userId } },
      { new: true }
    );

    return updatedUser;
  },
};

module.exports = UserService;
