import { authOptions } from "./config/authOptions";

export const { auth, signIn, signOut } = NextAuth(authOptions);
