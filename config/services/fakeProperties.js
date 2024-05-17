import properties from "@/properties.json";
import fs from "fs";

export async function getFakeProperties() {
  try {
    for (const property of properties) {
      delete property._id;
      property.owner = "663994b8d0e3688ceda7d45f";
      let imgList = [];
      for (const imgName of property.images) {
        imgList.unshift(readImage(imgName));
      }
      property.images = imgList;
    }

    // console.log("modified properties:", properties);
    return properties;
  } catch (error) {
    console.log("GET error:", error);
  }
}

function readImage(imgName) {
  try {
    const imageBuffer = fs.readFileSync(`./public/images/properties/${imgName}`);
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    return imageData;
    // convert image data to "base64"
    // const imageBase64 = imageData.toString("base64");
    // upload to cloudinary
    // cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
    //   folder: "property-pulse",
    // });

    // return new File(data, imgName, { type: "image/jpeg" });
  } catch (err) {
    console.error("read image error: ", err);
  }
}
