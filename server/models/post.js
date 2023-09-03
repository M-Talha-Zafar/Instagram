const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    images: [{ type: String, required: true }],
    caption: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
