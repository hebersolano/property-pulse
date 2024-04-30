import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import NavLink from "./NavLink";

function MobileMenu({ isLoggedIn }) {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <NavLink href="/" className="block">
          Home
        </NavLink>
        <NavLink href="/properties">Properties</NavLink>
        {isLoggedIn && <NavLink href="/properties/add">Add Property</NavLink>}

        {!isLoggedIn && (
          <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
            <FaGoogle className="text-white mr-2" />
            <span>Login or Register</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
