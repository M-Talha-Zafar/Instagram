const passport = require("passport");

const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authenticateJwt };
