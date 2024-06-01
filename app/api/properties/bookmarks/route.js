import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";
import User from "@/config/models/User";
import getUserSession from "@/config/userSessionServer";
import { ObjectId } from "mongodb";

// check if property is bookmarked
export async function GET(req) {
  try {
    dbConnect();
    const session = await getUserSession();

    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const user = await User.findOne({ email: session.user.email });

    return new Response(JSON.stringify({ bookmark: user?.bookmarks }), { status: 200 });
  } catch (error) {
    console.error("error bookmarks:", error);
  }
}

// add property to bookmarks
export async function PUT(req) {
  try {
    dbConnect();
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("propertyId");
    if (!propertyId)
      return new Response("Bad Request: no property id in search params", { status: 400 });
    if (!ObjectId.isValid(propertyId))
      return new Response("Bad Request: invalid id", { status: 400 });

    const propertyExists = await Property.exists({ _id: propertyId })
      .then(() => true)
      .catch(() => false);
    console.log("is allowed bookmark:", propertyExists);
    if (!propertyExists) return new Response("Bad Request: property not found", { status: 400 });

    const isBookmarked = Boolean(session?.user?.bookmarks?.includes(propertyId));
    console.log("is bookmarked:", isBookmarked);
    const user = await User.findById(session.user.id);

    console.log("DB user bookmarks:", user?.bookmarks);
    if (isBookmarked) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { $pull: { bookmarks: propertyId } }
      );
      // user.bookmarks = user.bookmarks.filter((bookmark) => bookmark !== propertyId);
      // user.save();
      return new Response("ok", { status: 200 });
    }

    console.log("bookmarked so it shouldnt run");
    user.bookmarks.push(propertyId);
    user.save();
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Server Error: error bookmarks", error);
    return new Response("Server Error", { status: 500 });
  }
}
