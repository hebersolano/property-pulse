"use client";

import { deleteMessage, markAsRead } from "@/app/messages/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { twJoin } from "tailwind-merge";

function MessageButtons({ messageId, isRead }) {
  let [isPending, startTransition] = useTransition();

  async function handleMarkRead() {
    let res = await markAsRead(messageId);
    toast.success(res ? "Message marked as read" : "Message unmarked as read");
  }
  //markAsRead.bind(null, messageId)
  return (
    <>
      <button
        onClick={() => startTransition(handleMarkRead)}
        disabled={isPending}
        className={twJoin(
          isPending && "cursor-wait bg-gray-500",
          isRead && "bg-red-500",
          !isRead && "bg-blue-500",
          "mt-4 mr-3  text-white py-1 px-3 rounded-md"
        )}
      >
        {isRead ? "Mark As Unread" : "Mark As Read"}
      </button>
      <button
        onClick={() => startTransition(deleteMessage.bind(null, messageId))}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </>
  );
}

export default MessageButtons;
