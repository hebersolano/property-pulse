import NextAuth from "next-auth/next";
import { authOptions } from "@/config/authOptions";

const handler = NextAuth(authOptions);

// export { handler };
export { handler as GET, handler as POST };
