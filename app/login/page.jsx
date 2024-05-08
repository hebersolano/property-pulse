"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

function LoginPage() {
  return (
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg">
        <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Login or Register
        </h1>

        {/* <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
          inventore quaerat mollitia?
        </p> */}

        <div class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          {/* <p class="text-center text-lg font-medium">Login or Register to your account</p> */}

          <div>
            <label for="email" class="sr-only">
              Email
            </label>

            <div class="relative">
              <input
                type="email"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label for="password" class="sr-only">
              Password
            </label>

            <div class="relative">
              <input
                type="password"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button class="flex items-center justify-center w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
            Login or Register
          </button>

          <div>
            <p className="text-center">Or</p>
          </div>

          <button
            onClick={() => signIn("google")}
            class="flex items-center justify-center w-full rounded-lg text-white bg-gray-700 hover:bg-gray-900 hover:text-white px-5 py-3 text-sm "
          >
            <FaGoogle className=" mr-2 sm:mr-0 md:mr-2 " />
            <span className="">Login or Register with Google</span>
          </button>

          <p class="text-center text-sm text-gray-500">
            No account?
            <a class="underline" href="#">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
