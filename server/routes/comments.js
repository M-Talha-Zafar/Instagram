const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");
const commentAuth = require("../middlewares/comments/authorization");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await CommentsController.getAllByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const commentData = req.body;
  try {
    const newComment = await CommentsController.createComment(
      postId,
      commentData
    );
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: "Failed to create comment." });
  }
});

router.put("/:id", commentAuth, async (req, res) => {
  const commentId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedComment = await CommentsController.updateById(
      commentId,
      updatedData
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: "Failed to update comment." });
  }
});

router.delete("/:id", commentAuth, async (req, res) => {
  const commentId = req.params.id;
  try {
    const deletedComment = await CommentsController.deleteById(commentId);
    res.json(deletedComment);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete comment." });
  }
});

module.exports = router;
