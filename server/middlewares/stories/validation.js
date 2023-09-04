const validateStoryData = (req, res, next) => {
  const { image, userId } = req.body;

  if (!image || image.trim() === "") {
    throw new Error("Story image is required.");
  }

  if (!userId) {
    throw new Error("Owner of the story cannot be null");
  }

  next();
};

module.exports = validateStoryData;
