import cloudinary from "@/config/cloudinary";
import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";
import getUserSession from "@/config/userSessionServer";

// GET /api/properties
export async function GET() {
  await dbConnect();
  try {
    const properties = await Property.find({});
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
    let imagesUrl = [];

    if (type === "file") {
      const data = await req.formData();
      const images = data.getAll("images");
      console.log(images);

      for (const image of images) {
        const imageBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(imageBuffer);

        await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "property-pulse" }, function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              console.log(result);
              imagesUrl.push(result.secure_url);
              resolve(result);
            })
            .end(buffer);
        });
      }
    }

    if (type === "json") {
      info = await req.json();
      info.owner = session.user.id;
      console.log("info", info);
    }

    return new Response(JSON.stringify(info), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Something went wrong"), { status: 500 });
  }
}
