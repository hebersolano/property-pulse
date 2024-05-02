"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/logo-white.png";
import MobileMenu from "./Navbar/MobileMenu";
import MobileMenuButton from "./Navbar/MobileMenuButton";
import ProfileMenu from "./Navbar/ProfileMenu";
import NotificationsMenu from "./Navbar/NotificationsMenu";
import LogInButton from "./Navbar/LogInButton";
import { usePathname } from "next/navigation";
import NavLink from "./Navbar/NavLink";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <MobileMenuButton handleClick={() => setIsMobileMenuOpen((boo) => !boo)} />
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center " href="/">
              <Image className="h-10 w-auto mr-0 sm:mr-2" src={logo} alt="PropertyPulse" />

              <span className="hidden md:block text-white text-2xl font-bold ">PropertyPulse</span>
            </Link>

            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 sm:block">
              <div className="flex gap-1">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/properties">Properties</NavLink>
                {isLoggedIn && <NavLink href="/properties/add">Add Property</NavLink>}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* <!-- Right Side Menu (Logged Out) --> */}
            {!isLoggedIn && (
              <div className="hidden sm:block">
                <div className="flex items-center">
                  <LogInButton />
                </div>
              </div>
            )}

            {/* <!-- Right Side Menu (Logged In) --> */}
            {isLoggedIn && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationsMenu />
                {/* <!-- Profile dropdown button --> */}
                <div className="relative ml-3">
                  <ProfileMenu />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && <MobileMenu isLoggedIn={isLoggedIn} />}
    </nav>
  );
}

export default Navbar;
