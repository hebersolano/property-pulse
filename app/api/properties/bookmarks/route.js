import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";
import User from "@/config/models/User";
import getUserSession from "@/config/userSessionServer";
import { getCsrfToken } from "next-auth/react";

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
    if (!session?.user) return new Response("param error", { status: 500 });

    getCsrfToken();
    console.log("param id", id);

    const isAllowedToBookmark = await Property.exists({ _id: id })
      .then(() => true)
      .catch(() => false);
    console.log("exist res:", isAllowedToBookmark);

    if (isAllowedToBookmark) {
      session.user.bookmarks.push(id);
      console.log(session);
      updateSession(session);
    }

    // const user = await User.findOne({ email: session.user.email });

    return new Response(JSON.stringify({ bookmarks: session.user?.bookmarks }), { status: 200 });
  } catch (error) {
    console.error("error bookmarks:", error);
  }
}

async function updateSession(newSession) {
  await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/session`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      csrfToken: await getCsrfToken(),
      data: newSession,
    }),
  });
}
