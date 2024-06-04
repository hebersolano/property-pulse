import dbConnect from "@/config/dbConnect";
import getUserSession from "@/config/userSessionServer";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("propertyId");
    if (!propertyId)
      return new Response("Bad Request: no property id in search params", { status: 400 });
    if (!ObjectId.isValid(propertyId))
      return new Response("Bad Request: invalid property id", { status: 400 });

    const isBookmarked = session.user.bookmarks.includes(propertyId);
    return new Response(JSON.stringify({ isBookmarked, propertyId }), { status: 200 });
  } catch (error) {
    console.error("Server Error: check bookmark", error);
    return new Response("Server Error", { status: 500 });
  }
}
