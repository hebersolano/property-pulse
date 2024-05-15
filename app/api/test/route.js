import { addProperty } from "@/config/services/propertiesApi";
import properties from "@/properties.json";
import fs from "fs";

export async function GET(req) {
  try {
    let propertyT = properties[0];
    // for (const property of properties) {
    let array = [];
    for (const imgName of propertyT.images) {
      array.unshift(readImage(imgName));
    }
    propertyT.images = array;
    propertyT.name = "FAKE TEST";
    // }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.log("GET error:", error);
    return new Response("Something went wrong", { status: 500 });
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
