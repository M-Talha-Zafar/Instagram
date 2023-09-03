const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/stories");
const storyAuth = require("../middlewares/stories/authorization");

router.get("/user/:userId", StoryController.getAllByUserId);

router.post("/", StoryController.create);

// const withExceptionHandling = (middlewareFunc) => async (req, res, next) => {
//   try {
//     await middlewareFunc(req, res, next);
//   } catch (ex) {
//     console.log(ex);
//     next({ status: 500, message: ex.message });
//   }
// };

router.delete("/:id", storyAuth, StoryController.deleteById);

module.exports = router;
