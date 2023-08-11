const router = require("express").Router();
const UserController = require("../controllers/users");

router.get("/", async (req, res) => {
  try {
    const users = await UserController.getAll();
    res.send(users);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
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

router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await UserController.create(userData);
    res.send(newUser);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedUser = await UserController.updateById(userId, updatedData);
    res.send(updatedUser);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await UserController.deleteById(userId);
    res.send(deletedUser);
  } catch (ex) {
    res.status(500).send({ error: ex.message });
  }
});

module.exports = router;
