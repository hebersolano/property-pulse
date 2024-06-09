import Link from "next/link";

function Pagination({ paginate }) {
  console.log(paginate);

  const {
    docs,
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = paginate;

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {hasPrevPage && (
        <Link
          href={`?page=${prevPage}`}
          replace={true}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        >
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
