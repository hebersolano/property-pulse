import "@/config/dbConnect"; // DB connection context
import Property from "@/config/models/Property";

// GET /api/properties
export async function GET() {
  try {
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log("GET error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
