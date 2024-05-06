import Property from "@/config/models/Property";
import { connectDB } from "@/config/database";
connectDB();

// GET /api/properties
export async function GET(req, { params }) {
  console.log(params);
  try {
    const property = await Property.findById(params.id);

    if (!property) return new Response("Property Not Found", { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log("GET error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
