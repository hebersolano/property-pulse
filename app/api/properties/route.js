import { uploadImgBufferCloudinary } from "@/config/cloudinary";
import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";
import getUserSession from "@/config/userSessionServer";
import { getFakeProperties } from "@/config/services/fakeProperties";

const NEXT_API = process.env.NEXT_PUBLIC_API || null;

// GET /api/properties
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("featured");
    let query = {};
    if (isFeatured) {
      query.isFeatured = true;
    }
    await dbConnect();
    const properties = await Property.find(query);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log("GET error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getUserSession();

    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    let info;

    if (type === "file") {
      global.imagesUrl = [];
      const data = await req.formData();
      const images = data.getAll("images");

      let arrayImgPromises = [];
      for (const image of images) {
        const imageBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(imageBuffer);

        arrayImgPromises.push(uploadImgBufferCloudinary(buffer));
      }
      global.imagesUrl = await Promise.all(arrayImgPromises);
      return new Response("ok", { status: 200 });
    }

    if (type === "json") {
      info = await req.json();
      info.owner = session.user.id;
      info.images = global.imagesUrl;
      delete global.imagesUrl;

      const property = new Property(info);
      const res = await property.save();
      return new Response(JSON.stringify(res), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Something went wrong"), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    await Property.deleteMany({});

    const properties = await getFakeProperties();
    for (const property of properties) {
      let arrayImgPromises = [];

      for (const image of property.images) {
        arrayImgPromises.push(uploadImgBufferCloudinary(image.buffer, image.name));
      }

      const arrayUrlImages = await Promise.all(arrayImgPromises);
      property.images = arrayUrlImages;
      property.owner = session.user.id;

      const newProperty = new Property(property);
      await newProperty.save();
    }

    return new Response("Test properties created", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Test data error"), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const session = await getUserSession();

    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const data = await req.json();
    const id = data._id;
    delete data._id;

    const res = await Property.findByIdAndUpdate(id, data).where("owner").equals(session.user.id);

    if (!res) return new Response("no property has been update", { status: 406 });
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
