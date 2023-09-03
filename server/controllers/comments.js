const CommentService = require("../services/comments");

const CommentController = {
  createComment: async (req, res) => {
    const postId = req.params.postId;
    const commentData = req.body;
    try {
      const newComment = await CommentService.createComment(
        postId,
        commentData
      );
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create comment." });
    }
  },

  updateById: async (req, res) => {
    const commentId = req.params.id;
    const updatedData = req.body;
    try {
      const updatedComment = await CommentService.updateById(
        commentId,
        updatedData
      );
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update comment." });
    }
  },

  deleteById: async (req, res) => {
    const commentId = req.params.id;
    try {
      const deletedComment = await CommentService.deleteById(commentId);
      res.json(deletedComment);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete comment." });
    }
  },
};

module.exports = CommentController;
