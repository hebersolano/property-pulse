import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <section className="bg-blue-50 flex flex-1 justify-center items-center">
      <div className="bg-white min-w-56 py-12 px-6 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <div className="flex justify-center">
          <FaExclamationTriangle className="fa-5x text-6xl md:text-8xl text-yellow-400" />
        </div>
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
          <p className="text-gray-500 md:text-xl mb-10">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
