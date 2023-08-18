const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const UserController = {
  getAll: async () => {
    try {
      return User.find();
    } catch (ex) {
      throw new Error("An error occurred while fetching users");
    }
  },

  getById: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error();
      return user;
    } catch (ex) {
      throw new Error("An error occurred while fetching the user");
    }
  },

  create: async (userData) => {
    try {
      return User.create(userData);
    } catch (ex) {
      throw new Error("An error occurred while creating the user");
    }
  },

  updateById: async (id, updatedData) => {
    try {
      return User.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (ex) {
      throw new Error("An error occurred while updating the user");
    }
  },

  deleteById: async (id) => {
    try {
      return User.findByIdAndDelete(id);
    } catch (ex) {
      throw new Error("An error occurred while deleting the user");
    }
  },

  login: async (req, res) => {
    passport.authenticate(
      "local",
      { session: false },
      async (err, user, info) => {
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
          console.log(error);
          return res.status(500).json({ message: "An error occurred." });
        }
      }
    )(req, res);
  },

  signup: async (req, res) => {
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

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      return res.json({ ...newUser._doc, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred." });
    }
  },
};

module.exports = UserController;
