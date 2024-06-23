"use server";

import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

export async function authenticate(formData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    switch (error?.type) {
      case "CredentialsSignin": {
        return "Invalid Credentials";
      }

      default: {
        console.error(error.type);
        console.log(error);
        return "Something went wrong";
      }
    }
  }
}
