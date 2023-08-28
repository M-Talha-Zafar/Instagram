const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const postAuth = require("../middlewares/posts/authorization");

router.get("/", async (req, res) => {
  try {
    const posts = await PostsController.getAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/by-user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const posts = await PostsController.getPostsForUser(userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostsController.getById(postId);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const newPost = await PostsController.create(postData);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Failed to create post." });
  }
});

router.post("/like/", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const post = await PostsController.like(userId, postId);
    res.status(200).json({ message: "Post liked", post });
  } catch (error) {
    res.status(400).json({ message: "Failed to create post." });
  }
});

router.post("/unlike/", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const post = await PostsController.unlike(userId, postId);
    res.status(200).json({ message: "Post unliked", post });
  } catch (error) {
    res.status(400).json({ message: "Failed to create post." });
  }
});

router.put("/:id", postAuth, async (req, res) => {
  const postId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedPost = await PostsController.updateById(postId, updatedData);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: "Failed to update post." });
  }
});

router.delete("/:id", postAuth, async (req, res) => {
  const postId = req.params.id;
  try {
    await PostsController.deleteById(postId);
    res.json({ message: "Post deleted." });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete post." });
  }
});

module.exports = router;
