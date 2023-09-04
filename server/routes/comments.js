const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");
const commentAuth = require("../middlewares/comments/authorization");
const withValidations = require("../middlewares/withValidation");
const validateCommentData = require("../middlewares/comments/validation");

router.post(
  "/:postId",
  withValidations(validateCommentData),
  CommentsController.createComment
);

router.put("/:id", commentAuth, CommentsController.updateById);

router.delete("/:id", commentAuth, CommentsController.deleteById);

module.exports = router;
