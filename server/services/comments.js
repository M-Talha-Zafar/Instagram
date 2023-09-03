const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentService = {
  createComment: async (postId, commentData) => {
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
  },

  updateById: async (commentId, updatedData) => {
    return Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
  },

  deleteById: async (commentId) => {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      throw new Error("Comment not found");
    }

    await Post.findByIdAndUpdate(
      deletedComment.post,
      { $pull: { comments: commentId } },
      { new: true }
    );

    return deletedComment;
  },
};

module.exports = CommentService;
