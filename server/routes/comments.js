const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");
const commentAuth = require("../middlewares/comments/authorization");

router.post("/:postId", CommentsController.createComment);

router.put("/:id", commentAuth, CommentsController.updateById);

router.delete("/:id", commentAuth, CommentsController.deleteById);

module.exports = router;
