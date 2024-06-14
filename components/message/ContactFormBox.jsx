"use client";

import MiniSpinner from "../MiniSpinner";
import LogInButton from "../authentication/LogInButton";
import { signIn, useSession } from "next-auth/react";

import ContactForm from "./ContactForm";

function ContactFormBox({ property }) {
  const { data: session, status } = useSession();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6 text-center">Contact Property Manager</h3>

      {status == "loading" && <MiniSpinner />}

      {status === "unauthenticated" && (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4">
            To send a message to the manager of this property, you need to login first
          </p>
          <LogInButton onClick={() => signIn("google")} />
        </div>
      )}

      {status === "authenticated" && <ContactForm property={property} user={session?.user} />}
    </div>
  );
}

export default ContactFormBox;
