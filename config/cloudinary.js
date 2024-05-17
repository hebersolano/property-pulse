import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function uploadImgBufferCloudinary(imgBuffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "property-pulse" }, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result.secure_url);
      })
      .end(imgBuffer);
  });
}

function uploadImgBase64Cloudinary(imageBase64) {
  return cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
    folder: "property-pulse",
  });
}

export { uploadImgBufferCloudinary };

export default cloudinary;
