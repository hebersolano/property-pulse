import Link from "next/link";

function ButtonLink({ to = "/", children }) {
  return (
    <Link
      href={to}
      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 ml-2"
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
