import MessageButtons from "./MessageButtons";

var options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

function Message({ message }) {
  const sentAt = new Date(message.createdAt);
  console.log(message);

  return (
    <div className="space-y-4">
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        {!message.read && (
          <div className="rounded-md border-ra absolute top-2 right-2 bg-yellow-500 text-white px-2">
            New
          </div>
        )}
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry: </span>
          {message.property?.name || <i>Property Not Found</i>}
        </h2>
        <p className="text-gray-700">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name: </strong> {message.sender.username}
          </li>

          <li>
            <strong>Reply Email: </strong>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </a>
          </li>
          {message?.phone && (
            <li>
              <strong>Reply Phone: </strong>
              <a href={`tel:${message.phone}`} className="text-blue-500">
                {message.phone}
              </a>
            </li>
          )}
          <li>
            <strong>Received: </strong>
            {sentAt.toLocaleDateString("en-US", options)}
          </li>
        </ul>
        <MessageButtons messageId={message._id} isRead={message.read} />
      </div>
    </div>
  );
}

export default Message;
