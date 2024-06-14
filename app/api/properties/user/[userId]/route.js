import dbConnect from "@/db/dbConnect";
import Property from "@/db/models/Property";

export async function GET(req, { params }) {
  try {
    if (!params.userId) return new Response("Error", { status: 404 });

    await dbConnect();
    const properties = await Property.find({ owner: params.userId }).catch((error) => {
      console.log(error.message);
      return null;
    });

    if (!properties) return new Response("Properties Not Found", { status: 404 });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log("GET error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
