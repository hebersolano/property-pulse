import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function uploadImgBufferCloudinary(imgBuffer, imgName) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "property-pulse", display_name: String(imgName).split(".")[0] },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result.secure_url);
        }
      )
      .end(imgBuffer);
  });
}

export { uploadImgBufferCloudinary };

export default cloudinary;
