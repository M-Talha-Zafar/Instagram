const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/stories");
const storyAuth = require("../middlewares/stories/authorization");

router.get("/user/:userId", StoryController.getAllByUserId);

router.post("/", StoryController.create);

router.delete("/:id", storyAuth, StoryController.deleteById);

module.exports = router;
