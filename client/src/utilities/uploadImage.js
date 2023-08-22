import axios from "axios";

export const upload = async (image) => {
  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "instagram");

    const cloudinaryUri = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`;

    const response = await axios.post(cloudinaryUri, formData);

    if (response.status === 200) {
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } else {
      throw new Error("Image upload failed:", response.statusText);
    }
  }
};
