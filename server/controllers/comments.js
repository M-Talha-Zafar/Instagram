const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentController = {
  getCommentById: async (commentId) => {
    try {
      return Comment.findById(commentId);
    } catch (error) {
      throw new Error("An error occurred while fetching the comment");
    }
  },

  createComment: async (postId, commentData) => {
    try {
      const post = await Post.findById(postId);
      if (!post) throw new Error("Post not found");

      const newComment = new Comment({
        post: postId,
        text: commentData.text,
        user: commentData.userId,
      });

      post.comments.push(newComment._id);
      await post.save();

      await newComment.save();
      return newComment;
    } catch (error) {
      throw new Error("An error occurred while creating the comment");
    }
  },

  updateCommentById: async (commentId, updatedData) => {
    try {
      return Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
    } catch (error) {
      throw new Error("An error occurred while updating the comment");
    }
  },

  deleteCommentById: async (commentId) => {
    try {
      return Comment.findByIdAndDelete(commentId);
    } catch (error) {
      throw new Error("An error occurred while deleting the comment");
    }
  },
};

module.exports = CommentController;
