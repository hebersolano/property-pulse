import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";
import User from "@/config/models/User";
import getUserSession from "@/config/userSessionServer";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic"; // route segment config Next-js

// get user bookmarks
export async function GET(req) {
  try {
    await dbConnect();
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const res = await User.findOne({ email: session.user.email }, "bookmarks").populate(
      "bookmarks"
    );

    return new Response(JSON.stringify(res.bookmarks), { status: 200 });
  } catch (error) {
    console.error("Server Error: error bookmarks", error);
    return new Response("Server Error", { status: 500 });
  }
}

// add property to bookmarks
export async function POST(req) {
  try {
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("propertyId");
    if (!propertyId)
      return new Response("Bad Request: no property id in search params", { status: 400 });
    if (!ObjectId.isValid(propertyId))
      return new Response("Bad Request: invalid property id", { status: 400 });

    await dbConnect();
    const propertyExists = await Property.exists({ _id: propertyId })
      .then(() => true)
      .catch(() => false);
    if (!propertyExists) return new Response("Bad Request: property not found", { status: 400 });

    const isBookmarked = Boolean(session?.user?.bookmarks?.includes(propertyId));

    if (isBookmarked) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { $pull: { bookmarks: propertyId } }
      );
      return new Response("ok", { status: 200 });
    }
    await User.findOneAndUpdate(
      { email: session.user.email },
      { $push: { bookmarks: propertyId } }
    );
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Server Error: error bookmarks", error);
    return new Response("Server Error", { status: 500 });
  }
}
