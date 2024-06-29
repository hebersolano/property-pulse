"use server";

import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";
import { error } from "console";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import path from "path";
import { z } from "zod";

class RegisterError {
  constructor(message) {
    this.message = message || "We encountered an issue while trying to create your account";
    this.ok = false;
  }
}

function RegisterResponse({
  msg = "We encountered an issue while trying to create",
  ok = false,
  redirect = null,
}) {
  return {
    msg,
    ok,
    redirect,
  };
}

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

    if (!parsedCredentials.success) return RegisterResponse();

    const { username, email, password, passwordCheck } = parsedCredentials.data;

    if (password !== passwordCheck) return RegisterResponse();

    await dbConnect();
    const userExist = await User.exists({ email });
    if (userExist?._id)
      return RegisterResponse({
        msg: "User already exists. Please sign in instead",
        redirect: "/login",
      });
    const newUser = await User.create({ username, email, password });
    await newUser.save();

    return { ok: true };
  } catch (error) {
    console.log("*****error register");
    console.error(error);
    return RegisterResponse();
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
