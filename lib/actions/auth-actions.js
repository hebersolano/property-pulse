"use server";

import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import path from "path";
import { z } from "zod";

export async function registerNewUser(formData) {
  try {
    const parsedCredentials = z
      .object({
        username: z.string().min(3).max(20).trim(),
        email: z.string().email(),
        password: z.string().min(8),
        passwordCheck: z.string().min(8),
      })
      .safeParse(formData);

    if (!parsedCredentials.success) return parsedCredentials.error.issues;

    const { username, email, password, passwordCheck } = parsedCredentials.data;

    if (password !== passwordCheck)
      return [{ message: "Passwords don't match", path: ["passwordCheck"] }];

    await dbConnect();
    const newUser = await User.create({ username, email, password });
    await newUser.save();
    return true;
  } catch (error) {
    console.log("*****error register");
    console.error(error);
    return false;
  }
}

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
