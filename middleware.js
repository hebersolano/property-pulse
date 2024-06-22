import NextAuth from "next-auth/next";
import { authOptions } from "./config/authOptions";

// export { default } from "next-auth/middleware";
export default NextAuth(authOptions).auth;

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
