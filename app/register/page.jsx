"use client";
import FormRow from "@/components/FormRow";
import { registerNewUser } from "@/lib/actions/auth-actions";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm();

  async function submitHandler(formData) {
    try {
      const res = await registerNewUser(formData);
      if (res?.ok) {
        toast.success(`Welcome to PropertyPulse, ${formData.username}`);
        await signIn("credentials", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          callbackUrl: process.env.NEXT_PUBLIC_DOMAIN,
        });
      }
      if (res?.redirect) router.push("/login");
      toast.error(res?.msg);
    } catch (error) {
      console.log(error);
      toast.error("Error signing up, please try later");
    }
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
              {...register("password", { required: "This field is required", minLength: 8 })}
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
              signIn("google", {
                callbackUrl: process.env.NEXT_PUBLIC_DOMAIN,
              });
            }}
            className="flex items-center justify-center w-full rounded-lg text-white bg-gray-700 hover:bg-gray-900 hover:text-white px-5 py-3  "
          >
            <FaGoogle className=" mr-2 sm:mr-0 md:mr-2 " />
            <span className="">Register with Google</span>
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
