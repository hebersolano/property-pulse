import { FaGoogle } from "react-icons/fa";

function LogInButton() {
  return (
    <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
      <FaGoogle className="text-white md:mr-2" />
      <span className="sm:hidden md:block">Login or Register</span>
    </button>
  );
}

export default LogInButton;
