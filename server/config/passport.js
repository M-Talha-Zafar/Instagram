require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secretKey = process.env.SECRET_KEY;

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "usernameOrEmail" },
    async (username, password, done) => {
      try {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

        let user = null;

        if (isEmail) {
          user = await User.findOne({ email: username }).populate("posts");
        } else {
          user = await User.findOne({ username: username }).populate("posts");
        }

        if (!user) {
          return done(null, false, { message: "Invalid credentials." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Invalid credentials." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id).populate("posts");
        if (user) {
          return done(null, user);
        } else {
          console.log("Token is valid but user not found");
          return done(null, false, { message: "Unauthorized" });
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = passport;
