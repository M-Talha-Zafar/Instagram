const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (image) => typeof image === "string" && image.trim() !== "",
        message: "Image URL is required.",
      },
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
