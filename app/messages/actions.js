"use server";

import dbConnect from "@/config/dbConnect";
import Message from "@/config/models/Message";
import { revalidatePath } from "next/cache";

export async function markAsRead(id) {
  try {
    await dbConnect();
    const msj = await Message.findById(id);
    console.log(msj);
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
    await dbConnect();
    const res = await Message.findByIdAndDelete(id);
    console.log("delete", msf);
    if (!res) return false;
    revalidatePath("/messages");
    return true;
  } catch (error) {
    console.log(error);
  }
}
