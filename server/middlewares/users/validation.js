const validateUserData = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required.");
  }

  next();
};

module.exports = validateUserData;
