import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";
import User from "@/config/models/User";
import getUserSession from "@/config/userSessionServer";

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
    if (!session?.user) return new Response("param error", { status: 500 });
    console.log("param propertyId", propertyId);

    const isAllowedToBookmark = await Property.exists({ _id: propertyId })
      .then(() => true)
      .catch(() => false);
    console.log("is allowed bookmark:", isAllowedToBookmark);

    if (isAllowedToBookmark) {
      const user = await User.findById(session.user.id);
      // console.log("USER", user);
      user.bookmarks.push(propertyId);
      user.save();
    }

    // const user = await User.findOne({ email: session.user.email });

    return new Response(JSON.stringify({ bookmarks: session.user?.bookmarks }), { status: 200 });
  } catch (error) {
    console.error("error bookmarks:", error);
  }
}
