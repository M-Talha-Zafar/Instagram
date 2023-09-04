const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const cors = require("cors");
const connectToMongo = require("./config/database");

const app = express();
const publicRoutes = require("./routes/public");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const storyRoutes = require("./routes/stories");
const { authenticateJwt } = require("./middlewares/authentication");

connectToMongo();

app.use(cors());
app.use(
  bodyParser.json({
    extended: true,
    limit: "5mb",
  })
);

app.use(express.json());

app.use(passport.initialize());

app.use("/", publicRoutes);

app.use(authenticateJwt);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/stories", storyRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
