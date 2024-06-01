"use client";

import { addPropertyToBookmarks } from "@/config/services/propertiesApi";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { twJoin } from "tailwind-merge";

function BookmarkButton({ propertyId }) {
  const { data: session, status, update } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(() =>
    Boolean(session?.user?.bookmarks?.includes(propertyId))
  );

  // 3 add property to bookmarks
  async function handleClick() {
    if (status === "authenticated") {
      const res = await addPropertyToBookmarks(propertyId);

      if (res) {
        update();
        setIsBookmarked((boo) => !boo);
        const msj = isBookmarked ? "Bookmark removed" : "Property bookmarked";
        toast.success(msj);
      }
    } else {
      toast.error("You need to login to bookmark a property");
      signIn("google");
    }
  }

  const twStyle = twJoin(
    isBookmarked ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600",
    "text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
  );

  return (
    <button onClick={handleClick} className={twStyle}>
      {isBookmarked ? <FaBookmark className="mr-2" /> : <FaRegBookmark className="mr-2" />}
      {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
}

export default BookmarkButton;
