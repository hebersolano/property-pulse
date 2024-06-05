import Message from "@/components/Message";
import { GET as apiGetUserMessages } from "../api/messages/route";

async function getUserMessages() {
  try {
    const res = await apiGetUserMessages();
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function MessagesPage() {
  const { messages } = await getUserMessages();
  const areMessages = Boolean(messages.length);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          {!areMessages && <p>You have no messages</p>}
          {areMessages &&
            messages.map((message) => <Message key={message._id} message={message} />)}
        </div>
      </div>
    </section>
  );
}

export default MessagesPage;
