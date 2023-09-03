const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const postAuth = require("../middlewares/posts/authorization");

router.get("/", PostsController.getAll);

router.get("/by-user/:id", PostsController.getPostsForUser);

router.get("/:id", PostsController.getById);

router.post("/", PostsController.create);

router.post("/like/", PostsController.like);

router.post("/unlike/", PostsController.unlike);

router.put("/:id", postAuth, PostsController.updateById);

router.delete("/:id", postAuth, PostsController.deleteById);

module.exports = router;
