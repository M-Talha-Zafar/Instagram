const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const postAuth = require("../middlewares/posts/authorization");
const withValidations = require("../middlewares/withValidation");
const validatePostData = require("../middlewares/posts/validation");

router.get("/", PostsController.getAll);

router.get("/by-user/:id", PostsController.getPostsForUser);

router.get("/:id", PostsController.getById);

router.post("/", withValidations(validatePostData), PostsController.create);

router.post("/like/", PostsController.like);

router.post("/unlike/", PostsController.unlike);

router.put("/:id", postAuth, PostsController.updateById);

router.delete("/:id", postAuth, PostsController.deleteById);

module.exports = router;
