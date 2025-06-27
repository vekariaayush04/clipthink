import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadVideo = async (videoPath: string , publicId: string) => {
    const result = await cloudinary.uploader.upload(videoPath, {
        resource_type: "video",
        public_id: publicId,
    })

    return result.secure_url;
}

export default uploadVideo;