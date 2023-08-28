const Comment = require("../../models/comment");

const commentAuth = async (req, res, next) => {
  const commentId = req.params.id;
  const userId = req.user._id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (!comment.user.equals(userId)) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = commentAuth;
