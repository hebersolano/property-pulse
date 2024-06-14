"use client";

import { useUserContext } from "@/components/user/UserContext";
import { deleteMessage, markAsRead } from "@/lib/actions/message-actions";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { twJoin } from "tailwind-merge";

function MessageButtons({ messageId, isRead }) {
  const { dispatch } = useUserContext();
  let [isPending, startTransition] = useTransition();

  async function handleMarkRead() {
    let res = await markAsRead(messageId);
    dispatch({ type: "update-msg-count", payload: res ? -1 : 1 });
    toast.success(res ? "Message marked as read" : "Message unmarked as read");
  }

  async function handleDelete() {
    const res = await deleteMessage(messageId);
    dispatch({ type: "update-msg-count", payload: res ? -1 : 0 });
    res ? toast.success("Message was deleted") : toast.error("Error deleting message");
  }

  return (
    <>
      <button
        onClick={() => startTransition(handleMarkRead)}
        disabled={isPending}
        className={twJoin(
          isPending && "cursor-wait bg-gray-500",
          !isPending && isRead && "bg-gray-500",
          !isPending && !isRead && "bg-yellow-500",
          "mt-4 mr-3  text-white py-1 px-3 rounded-md"
        )}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={() => startTransition(handleDelete)}
        disabled={isPending}
        className={twJoin(
          isPending && "cursor-wait bg-gray-500",
          !isPending && "bg-red-500",
          "mt-4  text-white py-1 px-3 rounded-md"
        )}
      >
        Delete
      </button>
    </>
  );
}

export default MessageButtons;
