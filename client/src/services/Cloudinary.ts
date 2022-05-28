import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dev-to-clone");
  const response = await axios.post(cloudinaryUrl, formData);
  if (response.status !== 200) {
    throw new Error("Error uploading file");
  }
  return response.data.secure_url;
};
