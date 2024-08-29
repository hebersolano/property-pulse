import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";
import properties from "@/properties.json";
import fs from "fs";

export async function getFakeProperties() {
  try {
    await dbConnect();
    let users = await User.find({}).limit(3);

    for (const property of properties) {
      const random = Math.floor(Math.random() * 3);
      delete property._id;
      property.owner = users[random]._id;
      let imgList = [];
      for (const imgName of property.images) {
        imgList.unshift({ buffer: readImage(imgName), name: imgName });
      }
      property.images = imgList;
    }

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
