const validateCommentData = (req, res, next) => {
  const postId = req.params.postId;
  const { text, userId } = req.body;

  if (!postId) {
    throw new Error("Post id is required.");
  }

  if (!text) {
    throw new Error("Comment text is required.");
  }

  if (!userId) {
    throw new Error("Owner of the comment is required.");
  }

  next();
};

module.exports = validateCommentData;
