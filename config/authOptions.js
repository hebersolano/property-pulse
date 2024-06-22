import GoogleProvider from "next-auth/providers/google";
import User from "../db/models/User";
import dbConnect from "../db/dbConnect";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const authOptions = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await User.find({ email });
          if (!user) return null;
          return user;
        }
      },
    }),
    GoogleProvider({
      debug: true,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: 6000,
      },
    }),
  ],
  callbacks: {
    authorize({ auth, request: { nestUrl } }) {
      console.log("******authorize callback running...");
      const isLoggedIn = typeof auth?.user !== undefined;
      if (isLoggedIn) return true;
      return false;
    },
    // invoked on successful sign-in
    async signIn({ profile }) {
      // console.log("profiles authOpts:", profile);

      // 1. connect to database
      await dbConnect();
      // 2 Check if user exist
      const user = await User.findOne({ email: profile.email });
      // 3. If not, then add user to database
      if (!user) {
        const username = profile.name.slice(0, 20);
        await User.create({ email: profile.email, username, image: profile.picture });
      }
      // 4 Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      // console.log("Session authOpts:", session);
      // 1. ge user from database
      await dbConnect();
      const user = await User.findOne({ email: session.user.email });
      // 2. assign the user id to the session
      session.user.id = user._id.toString();
      if (user?.bookmarks.length)
        session.user.bookmarks = user.bookmarks.map((bookmark) => bookmark.toString());
      else session.user.bookmarks = [];
      // 3. return session
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export { authOptions };
