const UserService = require("../services/users");

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await UserService.getAll();
      res.send(users);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
    }
  },

  getStoryPictures: async (req, res) => {
    const userId = req.params.id;
    try {
      const posts = await UserService.getStoryPictures(userId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  getFollowers: async (req, res) => {
    const userId = req.params.id;
    try {
      const users = await UserService.getFollowers(userId);
      res.send(users);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  getFollowing: async (req, res) => {
    const userId = req.params.id;
    try {
      const users = await UserService.getFollowing(userId);
      res.send(users);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  getRequests: async (req, res) => {
    const userId = req.params.id;
    try {
      const users = await UserService.getRequests(userId);
      res.send(users);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  sendFollowRequest: async (req, res) => {
    const { senderId, recipientId } = req.body;
    try {
      const user = await UserService.sendFollowRequest(senderId, recipientId);
      res.send(user);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  addFollower: async (req, res) => {
    const { senderId, recipientId } = req.body;
    try {
      const user = await UserService.addFollower(senderId, recipientId);
      res.send(user);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  acceptFollowRequest: async (req, res) => {
    const { userId, friendId } = req.body;
    try {
      const user = await UserService.acceptFollowRequest(userId, friendId);
      res.send(user);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  deleteFollowRequest: async (req, res) => {
    const { userId, unfollowId } = req.body;
    try {
      const user = await UserService.deleteFollowRequest(userId, unfollowId);
      res.send(user);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  unfollowUser: async (req, res) => {
    const { userId, unfollowId } = req.body;
    try {
      const user = await UserService.unfollowUser(userId, unfollowId);
      res.send(user);
    } catch (ex) {
      res.status(500).json({ message: "An error occurred." });
    }
  },

  searchUser: async (req, res) => {
    try {
      const searchQuery = req.query.searchQuery;
      if (!searchQuery || searchQuery.trim() === "") {
        return res.status(500).json({ error: "Invalid search term" });
      }
      const users = await UserService.searchUser(searchQuery);
      res.send(users);
    } catch (error) {
      res.status(500).json({
        error: "Failed to search for users",
        errorMessage: error.message,
      });
    }
  },

  getById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await UserService.getById(userId);
      res.send(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
    }
  },

  getByUsername: async (req, res) => {
    const username = req.params.username;
    try {
      const user = await UserService.getByUsername(username);
      res.send(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
    }
  },

  create: async (req, res) => {
    const userData = req.body;
    try {
      const newUser = await UserService.create(userData);
      res.send(newUser);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
    }
  },

  updateById: async (req, res) => {
    const userId = req.params.id;
    const { editedUser, image } = req.body;
    try {
      const updatedUser = await UserService.updateById(
        userId,
        editedUser,
        image
      );
      res.send(updatedUser);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
    }
  },

  deleteById: async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await UserService.deleteById(userId);
      res.send(deletedUser);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
    }
  },
};

module.exports = UserController;
