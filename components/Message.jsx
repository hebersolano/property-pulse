import MessageButtons from "./MessageButtons";

var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

function Message({ message }) {
  const sentAt = new Date(message.createdAt);

  return (
    <div className="space-y-4">
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry: </span>
          {message.property.name}
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
