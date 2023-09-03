const cloudinary = require("../config/cloudinary");

const upload = async (image) => {
  const result = await cloudinary.uploader.upload(image);
  return result.url;
};

module.exports = upload;
