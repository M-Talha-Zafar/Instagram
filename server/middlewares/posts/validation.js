const validatePostData = (req, res, next) => {
  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    throw new Error("At least one image are required for a post.");
  }

  next();
};

module.exports = validatePostData;
