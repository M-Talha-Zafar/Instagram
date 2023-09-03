const router = require("express").Router();
const UserController = require("../controllers/users");
const userAuth = require("../middlewares/users/authorization");

router.get("/", UserController.getAll);
router.get("/stories/:id", UserController.getStoryPictures);
router.get("/followers/:id", UserController.getFollowers);
router.get("/following/:id", UserController.getFollowing);
router.get("/requests/:id", UserController.getRequests);
router.post("/send-follow-request", UserController.sendFollowRequest);
router.post("/add-follower", UserController.addFollower);
router.post("/accept-follow-request", UserController.acceptFollowRequest);
router.post("/delete-follow-request", UserController.deleteFollowRequest);
router.post("/unfollow-user", UserController.unfollowUser);
router.get("/search", UserController.searchUser);
router.get("/:id", UserController.getById);
router.get("/by-username/:username", UserController.getByUsername);
router.post("/", UserController.create);
router.put("/:id", userAuth, UserController.updateById);
router.delete("/:id", userAuth, UserController.deleteById);

module.exports = router;
