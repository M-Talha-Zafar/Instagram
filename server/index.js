const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const cors = require("cors");
require("./config/database");

const app = express();
const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
