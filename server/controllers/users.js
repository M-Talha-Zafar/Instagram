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
      const user = await User.findById(id).populate("posts");
      if (!user) throw new Error();
      return user;
    } catch (ex) {
      throw new Error("An error occurred while fetching the user");
    }
  },

  getByUsername: async (username) => {
    try {
      const user = await User.findOne({ username: username }).populate("posts");
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

  searchUser: async (searchTerm) => {
    const regex = new RegExp(searchTerm, "i");
    const searchResults = await User.find({ username: regex });
    return searchResults;
  },

  getFollowers: async (userId) => {
    const user = await User.findById(userId).populate(
      "followers",
      "username profilePicture"
    );
    if (!user) throw new Error("User not found");
    return user.followers;
  },

  getFollowing: async (userId) => {
    const user = await User.findById(userId).populate(
      "following",
      "username profilePicture"
    );
    if (!user) throw new Error("User not found");

    return user.following;
  },

  getRequests: async (userId) => {
    const user = await User.findById(userId).populate("requests");
    if (!user) throw new Error("User not found");

    return user.requests;
  },

  sendFollowRequest: async (senderId, recipientId) => {
    const recipient = await User.findByIdAndUpdate(
      recipientId,
      { $addToSet: { requests: senderId } },
      { new: true }
    );

    return recipient;
  },

  addFollower: async (senderId, recipientId) => {
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId).populate("posts");

    if (!sender || !recipient) {
      throw new Error("Sender or recipient not found");
    }

    if (!recipient.followers.includes(senderId)) {
      recipient.followers.push(senderId);
      await recipient.save();
    }

    if (!sender.following.includes(recipientId)) {
      sender.following.push(recipientId);
      await sender.save();
    }

    return recipient;
  },

  acceptFollowRequest: async (userId, friendId) => {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { requests: friendId },
        $addToSet: { followers: friendId },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { following: userId } },
      { new: true }
    );

    return user;
  },

  unfollowUser: async (userId, unfollowId) => {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowId } },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      unfollowId,
      { $pull: { followers: userId } },
      { new: true }
    ).populate("posts");

    return user;
  },

  deleteFollowRequest: async (userId, unfollowId) => {
    const updatedUser = await User.findByIdAndUpdate(
      unfollowId,
      { $pull: { requests: userId } },
      { new: true }
    );

    return updatedUser;
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

  verify: (req, res) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "Token is invalid" });
      }

      res.json({ message: "Token is valid", user });
    })(req, res);
  },
};

module.exports = UserController;
