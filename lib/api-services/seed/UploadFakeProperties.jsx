"use client";
import { useRouter } from "next/navigation";

function UploadFakeProperties() {
  const router = useRouter();

  function handler() {
    fetch(`${process.env.NEXT_PUBLIC_API}/properties`, { method: "DELETE" }).then((res) => {
      router.refresh();
    });
  }

  return (
    <div>
      <button
        onClick={handler}
        className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 my-3"
      >
        Upload data
      </button>
    </div>
  );
}

export default UploadFakeProperties;
