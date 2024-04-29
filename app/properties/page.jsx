"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Properties() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl">Properties</h1>
      <button onClick={() => router.push("/")} className="bg-blue-500 px-1 py2">
        Go home
      </button>
      <Link href="/">Go home</Link>
    </div>
  );
}

export default Properties;
