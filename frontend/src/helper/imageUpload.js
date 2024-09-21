import axios from "axios";

export const uploadImageToCloudinary = async ({ file, customName }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'techlog_blog_img'); // replace with your upload preset
    formData.append('public_id', customName);

    const response = await axios.post(
        'https://api.cloudinary.com/v1_1/hassandemo/image/upload', // replace YOUR_CLOUD_NAME with your Cloudinary cloud name
        formData
    );
    return response.data;
};


// in image out url