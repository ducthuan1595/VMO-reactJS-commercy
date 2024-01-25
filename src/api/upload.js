import axios from 'axios'

export const uploadCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ecommerce-book');
    formData.append("cloud_name", "dvlbv6l2k");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dvlbv6l2k/image/upload", formData
    );
  
    return data;
  } catch(err) {
    console.log(err);
  }
}