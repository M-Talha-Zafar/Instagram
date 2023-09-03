const PostService = require("../services/posts");

const PostsController = {
  getAll: async (req, res) => {
    try {
      const posts = await PostService.getAll();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  getPostsForUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const posts = await PostService.getPostsForUser(userId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  getById: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await PostService.getById(postId);
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    const postData = req.body;
    try {
      const newPost = await PostService.create(postData);
      res.status(201).json(newPost);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Failed to create post." });
    }
  },

  like: async (req, res) => {
    const { userId, postId } = req.body;
    try {
      const post = await PostService.like(userId, postId);
      res.status(200).json({ message: "Post liked", post });
    } catch (error) {
      res.status(500).json({ message: "Failed to like post." });
    }
  },

  unlike: async (req, res) => {
    const { userId, postId } = req.body;
    try {
      const post = await PostService.unlike(userId, postId);
      res.status(200).json({ message: "Post unliked", post });
    } catch (error) {
      res.status(500).json({ message: "Failed to unlike post." });
    }
  },

  updateById: async (req, res) => {
    const postId = req.params.id;
    const updatedData = req.body;
    try {
      const updatedPost = await PostService.updateById(postId, updatedData);
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to update post." });
    }
  },

  deleteById: async (req, res) => {
    const postId = req.params.id;
    try {
      await PostService.deleteById(postId);
      res.json({ message: "Post deleted." });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post." });
    }
  },
};

module.exports = PostsController;
