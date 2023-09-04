const Comment = require("../models/comment");
const Post = require("../models/post");
const mongoose = require("mongoose");

const CommentService = {
  createComment: async (postId, commentData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const post = await Post.findById(postId).session(session);
      if (!post) throw new Error("Post not found");

      const newComment = new Comment({
        post: postId,
        text: commentData.text,
        user: commentData.userId,
      });

      post.comments.push(newComment._id);
      await post.save({ session });

      await newComment.save({ session });

      await session.commitTransaction();
      session.endSession();

      return newComment;
    } catch (error) {
      console.log(error.message);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  deleteById: async (commentId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId).session(
        session
      );
      if (!deletedComment) {
        throw new Error("Comment not found");
      }

      await Post.findByIdAndUpdate(
        deletedComment.post,
        { $pull: { comments: commentId } },
        { new: true }
      ).session(session);

      await session.commitTransaction();
      session.endSession();

      return deletedComment;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  updateById: async (commentId, updatedData) => {
    return Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
  },
};

module.exports = CommentService;
