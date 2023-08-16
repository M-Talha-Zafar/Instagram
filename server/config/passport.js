const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
