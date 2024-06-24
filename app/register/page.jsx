"use client";
import FormRow from "@/components/FormRow";
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
    console.log(formData);
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(submitHandler)} className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-blue-700 sm:text-3xl">Register</h1>

        <div className="mb-0 mt-6 space-y-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <FormRow label="username" errors={errors} required={true} labelStyle="sr-only">
            <input
              type="username"
              id="username"
              name="username"
              className="w-full rounded-lg border-gray-200 p-4 pe-12   shadow-sm"
              {...register("username", { required: "This field is required" })}
              placeholder="Username"
            />
          </FormRow>

          <FormRow label="Email" errors={errors} required={true} labelStyle="sr-only">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12   shadow-sm"
              {...register("email", { required: "This field is required" })}
              placeholder="Email"
            />
          </FormRow>

          <FormRow label="Password" labelStyle="sr-only" errors={errors} required={true}>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12   shadow-sm"
              placeholder="Password"
              {...register("password", { required: "This field is required", minLength: 6 })}
            />
          </FormRow>

          <FormRow label="Password" labelStyle="sr-only" errors={errors} required={true}>
            <input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              className="w-full rounded-lg border-gray-200 p-4 pe-12   shadow-sm"
              placeholder="Enter your password again"
              {...register("passwordCheck", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long!",
                },
                validate: (value, formValues) =>
                  value !== formValues.password ? "Password doesn't match" : true,
              })}
            />
          </FormRow>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full rounded-lg bg-blue-700 hover:bg-blue-800 px-5 py-3  font-medium text-white"
          >
            Register
          </button>

          <div>
            <p className="text-center">Or</p>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
            className="flex items-center justify-center w-full rounded-lg text-white bg-gray-700 hover:bg-gray-900 hover:text-white px-5 py-3  "
          >
            <FaGoogle className=" mr-2 sm:mr-0 md:mr-2 " />
            <span className="">Login or Register with Google</span>
          </button>

          <p className="text-center  text-gray-500">
            Have already an account?
            <Link className="underline pl-1" href="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
