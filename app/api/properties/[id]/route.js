import { authOptions } from "@/config/authOptions";
import dbConnect from "@/db/dbConnect";
import Property from "@/db/models/Property";
import { getServerSession } from "next-auth";

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
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("unauthorized", { status: 401 });

    if (!params.id) return new Response("no property id", { status: 400 });

    await dbConnect();
    const res = await Property.findByIdAndDelete(params.id).where("owner").equals(session.user.id);
    if (!res) return new Response("no property has been delete", { status: 406 });

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.log("DELETE error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
