import Link from "next/link";
import { twJoin } from "tailwind-merge";

function SortButtons({ searchParams, sort }) {
  return (
    <div className="inline-flex rounded md:ml-4  " role="group">
      <Link
        href={`/properties?${new URLSearchParams({ ...searchParams, sort: "desc" }).toString()}`}
        className={twJoin(
          searchParams.sort === "desc" && "bg-blue-600 font-semibold ",
          "w-full md:w-auto px-4 py-1 rounded-l border text-white hover:bg-blue-600"
        )}
      >
        Desc
      </Link>
      <Link
        href={`/properties?${new URLSearchParams({ ...searchParams, sort: "asc" }).toString()}`}
        className={twJoin(
          searchParams.sort === "asc" && "bg-blue-600 font-semibold ",
          "w-full md:w-auto px-4 py-1 rounded-e border text-white hover:bg-blue-600"
        )}
      >
        Asc
      </Link>
    </div>
  );
}

export default SortButtons;
