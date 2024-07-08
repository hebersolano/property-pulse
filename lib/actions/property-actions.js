"use server";

import getUserSession from "@/config/userSessionServer";
import dbConnect from "@/db/dbConnect";
import Property from "@/db/models/Property";
import User from "@/db/models/User";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSearchQueries(formData) {
  let params = {};
  const location = formData.get("location");
  if (location) params.location = location;
  const type = formData.get("property-type");
  if (type) params.type = type;
  const sort = formData.get("property-sort");
  if (sort) params.sort = sort;

  redirect(`/properties?${new URLSearchParams(params).toString()}`);
}

export async function getBookmarks() {
  try {
    const session = await getUserSession();
    if (!session?.user) return [];
    await dbConnect();
    let { bookmarks } = await User.findById(session.user.id, "bookmarks");
    bookmarks = bookmarks.map((b) => b.toString());
    return bookmarks;
  } catch (error) {
    console.log(error);
  }
}

export async function addBookmark(propertyId) {
  if (!ObjectId.isValid(propertyId)) return { ok: false, msg: "error adding bookmark" };

  const session = await getUserSession();
  if (!session?.user) return { ok: false, msg: "error adding bookmark" };

  await dbConnect();
  const propertyExists = await Property.exists({ _id: propertyId })
    .then(() => true)
    .catch(() => false);
  if (!propertyExists) return { ok: false, msg: "error adding bookmark" };

  let { bookmarks } = await User.findById(session.user.id, "bookmarks");
  const isBookmarked = Boolean(bookmarks?.includes(propertyId));

  if (isBookmarked) {
    await User.findOneAndUpdate({ _id: session.user.id }, { $pull: { bookmarks: propertyId } });
    revalidatePath("/properties/saved", "page");
    return { ok: true, msg: "bookmark removed" };
  }

  await User.findOneAndUpdate({ _id: session.user.id }, { $push: { bookmarks: propertyId } });

  revalidatePath("/properties/saved", "page");
  return { ok: true, msg: "bookmark added" };
}
