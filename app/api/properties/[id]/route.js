import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";

// GET /api/properties
export async function GET(req, { params }) {
  await dbConnect();
  try {
    if (!params.id) return new Response("Error", { status: 404 });

    const property = await Property.findById(params.id).catch((error) => {
      console.log(error.message);
      return null;
    });

    if (!property) return new Response("Property Not Found", { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log("GET error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
