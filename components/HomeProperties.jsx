import Link from "next/link";
import FeaturedProperties from "./FeaturedProperties";
import RecentProperties from "./RecentProperties";
import { Suspense } from "react";

async function HomeProperties() {
  return (
    <>
      <Suspense fallback={"loading..."}>
        <FeaturedProperties />
      </Suspense>

      <Suspense fallback={"Loading..."}>
        <RecentProperties />
      </Suspense>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}

export default HomeProperties;
