"use client";

import { addPropertyToBookmarks, checkPropertyIsBookmarked } from "@/lib/api-services/apiProperty";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import { useUserContext } from "../user/UserContext";
import { addBookmark, getBookmarks } from "@/lib/actions/property-actions";

function BookmarkButton({ propertyId }) {
  const { status } = useSession();
  const { bookmarks, dispatch } = useUserContext();
  console.log("compon bookmarks", bookmarks);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(
    function () {
      setIsBookmarked(() => Boolean(bookmarks?.includes(propertyId)));
    },
    [bookmarks, propertyId]
  );

  // 3 add property to bookmarks
  async function handleClick() {
    if (status === "authenticated") {
      const res = await addBookmark(propertyId);
      console.log("component addBookmark res:", res);

      if (res?.ok) {
        // update();
        setIsBookmarked((boo) => !boo);
        dispatch({ type: "update-bookmarks", payload: await getBookmarks() });
        toast.success(res.msg);
      } else {
        toast.error(res.msg);
      }
    } else {
      toast.error("You need to login to bookmark a property");
    }
  }

  const twStyle = twJoin(
    "text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center",
    isBookmarked ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
  );

  return (
    <button onClick={handleClick} className={twStyle}>
      {isBookmarked ? <FaBookmark className="mr-2" /> : <FaRegBookmark className="mr-2" />}
      {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
}

export default BookmarkButton;
