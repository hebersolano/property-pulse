"use server";

import dbConnect from "@/db/dbConnect";
import Message from "@/db/models/Message";
import getUserSession from "@/config/userSessionServer";
import { revalidatePath } from "next/cache";

export async function markAsRead(id) {
  try {
    await dbConnect();
    const msj = await Message.findById(id);
    msj.read = !msj.read;
    await msj.save();
    revalidatePath("/messages");
    return msj.read;
  } catch (error) {
    return false;
  }
}

export async function deleteMessage(id) {
  try {
    const session = await getUserSession();
    if (!session?.user) return false;
    await dbConnect();
    const messages = await Message.findByIdAndDelete(id);
    if (!messages) return false;
    revalidatePath("/messages");
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getMessagesCount() {
  try {
    const session = await getUserSession();
    if (!session?.user) return 0;
    await dbConnect();
    const countMsg = await Message.countDocuments({ recipient: session.user.id, read: false });
    return Number(countMsg);
  } catch (error) {
    console.log(error);
  }
}
