const User = require("../../models/user");

const userAuth = async (req, res, next) => {
  const requestedId = req.params.id;
  const currentId = req.user._id;
  try {
    const user = await User.findById(requestedId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user._id.equals(currentId)) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userAuth;
