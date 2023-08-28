const router = require("express").Router();
const UserController = require("../controllers/users");
const userAuth = require("../middlewares/users/authorization");

router.get("/", async (req, res) => {
  try {
    const users = await UserController.getAll();
    res.send(users);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

router.get("/stories/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const posts = await UserController.getStoryPictures(userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/followers/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await UserController.getFollowers(userId);
    res.send(users);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/following/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await UserController.getFollowing(userId);
    res.send(users);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/requests/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await UserController.getRequests(userId);
    res.send(users);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/send-follow-request", async (req, res) => {
  const { senderId, recipientId } = req.body;
  try {
    const user = await UserController.sendFollowRequest(senderId, recipientId);
    res.send(user);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/add-follower", async (req, res) => {
  const { senderId, recipientId } = req.body;
  try {
    const user = await UserController.addFollower(senderId, recipientId);
    res.send(user);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/accept-follow-request", async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await UserController.acceptFollowRequest(userId, friendId);
    res.send(user);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/delete-follow-request", async (req, res) => {
  const { userId, unfollowId } = req.body;
  try {
    const user = await UserController.deleteFollowRequest(userId, unfollowId);
    res.send(user);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/unfollow-user", async (req, res) => {
  const { userId, unfollowId } = req.body;
  try {
    const user = await UserController.unfollowUser(userId, unfollowId);
    res.send(user);
  } catch (ex) {
    res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({ error: "Invalid search term" });
    }
    const users = await UserController.searchUser(searchQuery);
    res.send(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to search for users",
      errorMessage: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserController.getById(userId);
    res.send(user);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

router.get("/by-username/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await UserController.getByUsername(username);
    res.send(user);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await UserController.create(userData);
    res.send(newUser);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

router.put("/:id", userAuth, async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  console.log("I'm here");
  try {
    const updatedUser = await UserController.updateById(userId, updatedData);
    res.send(updatedUser);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

router.delete("/:id", userAuth, async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await UserController.deleteById(userId);
    res.send(deletedUser);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

module.exports = router;
