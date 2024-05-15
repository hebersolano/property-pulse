"use client";
import { SessionProvider, getSession } from "next-auth/react";

function AuthProvider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

AuthProvider.getInitialProps = async (context) => {
  console.log("auth context:", context);
  const { ctx } = context;
  const session = await getSession(ctx);

  return {
    session,
  };
};

export default AuthProvider;
