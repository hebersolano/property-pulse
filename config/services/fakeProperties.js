import properties from "@/properties.json";
import fs from "fs";

export async function getFakeProperties() {
  try {
    for (const property of properties) {
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
    const data = fs.readFileSync(`./public/images/properties/${imgName}`);
    return new File(data, imgName, { type: "image/jpeg" });
  } catch (err) {
    console.error("read image error: ", err);
  }
}
