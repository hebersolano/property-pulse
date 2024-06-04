import dbConnect from "@/config/dbConnect";
import Message from "@/config/models/Message";
import getUserSession from "@/config/userSessionServer";

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const data = await req.json();

    if (data.recipient === session.user.id)
      return new Response("Bad Request: same user", { status: 400 });

    const newMessage = new Message(data);
    await newMessage.save();

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Server Error: messages", error);
    return new Response("Server Error", { status: 500 });
  }
}
