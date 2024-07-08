import Link from "next/link";
import { GET as getApiSearchProperties } from "@/app/api/properties/search/route";

async function Pagination({ searchParams }) {
  const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } =
    await getApiSearchProperties(searchParams);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {hasPrevPage && (
        <Link href={`?page=${prevPage}`} className="mr-2 px-2 py-1 border border-gray-300 rounded">
          Previous
        </Link>
      )}
      <span className="mx-2">{`Page ${page} of ${totalPages}`}</span>
      {hasNextPage && (
        <Link href={`?page=${nextPage}`} className="ml-2 px-2 py-1 border border-gray-300 rounded">
          Next
        </Link>
      )}
    </section>
  );
}

export default Pagination;
