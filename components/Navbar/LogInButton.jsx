import { FaGoogle } from "react-icons/fa";

function LogInButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
    >
      <FaGoogle className="text-white mr-2 sm:mr-0 md:mr-2 " />
      <span className="sm:hidden md:block">Login or Register</span>
    </button>
  );
}

export default LogInButton;
