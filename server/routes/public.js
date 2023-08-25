const router = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  passport.authenticate("local", { session: false }, async (err, user) => {
    try {
      if (err) {
        return res.status(500).json({ message: "An error occurred." });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      return res.json({ ...user._doc, token });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred." });
    }
  })(req, res);
});

router.post("/signup", async (req, res) => {
  const { fullname, username, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    return res.json({ ...newUser._doc, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/verify-token", (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    res.json({ message: "Token is valid", user });
  })(req, res);
});

module.exports = router;
