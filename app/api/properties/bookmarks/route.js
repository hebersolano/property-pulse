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
    const id = searchParams.get("id");

    Property.findById(id);

    const user = await User.findOne({ email: session.user.email });

    return new Response(JSON.stringify({ bookmark: user?.bookmarks }), { status: 200 });
  } catch (error) {
    console.error("error bookmarks:", error);
  }
}
