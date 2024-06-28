"use client";
import FormRow from "@/components/FormRow";
import { authenticate } from "@/lib/actions/auth-actions";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm();

  async function submitHandler(formData) {
    try {
      let res = await signIn("credentials", {
        ...formData,
        callbackUrl: process.env.NEXT_PUBLIC_DOMAIN,
      });
    } catch (error) {
      switch (error?.type) {
        case "CredentialsSignin": {
          return "Invalid Credentials";
        }
      }
      console.error(error.type);
      console.log(error);
      reset();
      return "Something went wrong";
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(submitHandler)} className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-blue-700 sm:text-3xl">
          Login or Register
        </h1>

        <div className="mb-0 mt-6 space-y-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <FormRow label="Email" errors={errors} required={true} labelStyle="sr-only">
            <input
              type="text"
              id="email"
              name="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12   shadow-sm"
              {...register("email", { required: "This field is required" })}
              placeholder="Enter email or username"
            />
          </FormRow>

          <FormRow label="Password" labelStyle="sr-only" errors={errors} required={true}>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12   shadow-sm"
              placeholder="Enter password"
              {...register("password", { required: "This field is required" })}
            />
          </FormRow>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full rounded-lg bg-blue-700 hover:bg-blue-800 px-5 py-3 text-sm font-medium text-white"
          >
            Login or Register
          </button>

          <div>
            <p className="text-center">Or</p>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              signIn("google", {
                callbackUrl: process.env.NEXT_PUBLIC_DOMAIN,
              });
            }}
            className="flex items-center justify-center w-full rounded-lg text-white bg-gray-700 hover:bg-gray-900 hover:text-white px-5 py-3 text-sm "
          >
            <FaGoogle className=" mr-2 sm:mr-0 md:mr-2 " />
            <span className="">Log in with Google</span>
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <Link className="underline" href="/register">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
