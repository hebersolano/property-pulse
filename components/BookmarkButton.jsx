"use client";

import { addPropertyToBookmarks } from "@/config/services/propertiesApi";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";

function BookmarkButton({ propertyId }) {
  const { data: session, status, update } = useSession();
  // 1. check if it's bookmarked

  // 2. bookmark functionality

  // 3 add property to bookmarks
  async function handleClick() {
    const res = await addPropertyToBookmarks(propertyId);
    if (status === "authenticated") update({ name: "heber" });
  }

  return (
    <button
      onClick={() => update({ id: propertyId })}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
}

export default BookmarkButton;
