import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";

export default async function getUserSession() {
  return await getServerSession(authOptions);
}
