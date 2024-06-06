import dbConnect from "@/config/dbConnect";
import Message from "@/config/models/Message";
import getUserSession from "@/config/userSessionServer";

export async function GET() {
  try {
    await dbConnect();
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const messages = await Message.find({ recipient: session.user.id })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    return new Response(JSON.stringify({ messages }), { status: 200 });
  } catch (error) {
    console.error("Server Error: get messages", error);
    return new Response("Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getUserSession();
    if (!session?.user) return new Response("unauthorized", { status: 401 });

    const data = await req.json();

    if (data.recipient === session.user.id)
      return new Response("Bad Request: sender and recipient are the same", { status: 400 });

    const newMessage = new Message(data);
    await newMessage.save();

    return new Response("Message was sent successfully", { status: 200 });
  } catch (error) {
    console.error("Server Error: post messages", error);
    return new Response("Server Error", { status: 500 });
  }
}
