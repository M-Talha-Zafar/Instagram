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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

      return res.json({ token });
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ message: "Error logging in after signup." });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

      return res.json({ token });
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred." });
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
