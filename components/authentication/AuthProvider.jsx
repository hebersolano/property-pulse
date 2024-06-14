"use client";
import { SessionProvider, getSession } from "next-auth/react";

function AuthContext({ children, session }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
}

// AuthContext.getInitialProps = async (context) => {
//   const { ctx } = context;
//   const session = await getSession(ctx);

//   return {
//     session,
//   };
// };

// AuthContext
export default AuthContext;
