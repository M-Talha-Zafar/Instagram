const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const mongoose = require("mongoose");
const upload = require("../utilities/upload-image");

const PostController = {
  getAll: async () => {
    try {
      return Post.find()
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments");
    } catch (error) {
      throw new Error("An error occurred while fetching posts");
    }
  },

  getPostsForUser: async (userId) => {
    try {
      const posts = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $match: {
            $or: [
              { "user.isPrivate": false },
              { "user.followers": new mongoose.Types.ObjectId(userId) },
              { "user._id": new mongoose.Types.ObjectId(userId) },
            ],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      return posts;
    } catch (error) {
      throw new Error("An error occurred while fetching posts");
    }
  },

  getById: async (postId) => {
    try {
      return Post.findById(postId)
        .populate("user")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            model: "User",
            select: "username profilePicture",
          },
        });
    } catch (error) {
      throw new Error("An error occurred while fetching the post");
    }
  },

  create: async (postData) => {
    try {
      const uploadPromises = postData.images.map(async (url) => {
        const uploadedUrl = await upload(url);
        return uploadedUrl;
      });

      const uploadedImages = await Promise.all(uploadPromises);

      const newPost = new Post({
        images: uploadedImages,
        caption: postData.caption,
        user: postData.userId,
      });

      await newPost.save();

      await User.findByIdAndUpdate(postData.userId, {
        $push: { posts: newPost._id },
      });

      return newPost;
    } catch (error) {
      console.log(error.message);
      throw new Error("An error occurred while creating the post");
    }
  },

  updateById: async (postId, updatedData) => {
    try {
      return Post.findByIdAndUpdate(postId, updatedData, { new: true });
    } catch (error) {
      throw new Error("An error occurred while updating the post");
    }
  },

  deleteById: async (postId) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        throw new Error("Post not found");
      }

      const commentIds = deletedPost.comments.map((comment) => comment._id);

      await Comment.deleteMany({ _id: { $in: commentIds } });

      await User.findByIdAndUpdate(
        deletedPost.user,
        { $pull: { posts: postId } },
        { new: true }
      );

      return deletedPost;
    } catch (error) {
      throw new Error("An error occurred while deleting the post");
    }
  },

  like: async (userId, postId) => {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likedBy: userId } }, // Using $addToSet to avoid duplicate likes
      { new: true }
    );
    return post;
  },

  unlike: async (userId, postId) => {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likedBy: userId } },
      { new: true }
    );
    return post;
  },
};

module.exports = PostController;
