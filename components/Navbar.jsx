"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/logo-white.png";
import MobileMenuButton from "./Navbar/MobileMenuButton";
import ProfileMenu from "./Navbar/ProfileMenu";
import NotificationsMenu from "./Navbar/NotificationsMenu";
import LogInButton from "./Navbar/LogInButton";
import NavLink from "./Navbar/NavLink";

import { signIn, signOut, useSession } from "next-auth/react";
import MiniSpinner from "./MiniSpinner";

function Navbar() {
  const { data: session, status } = useSession();
  console.log("session status:", status);
  const profileImg = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="container-xl">
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
                {session && <NavLink href="/properties/add">Add Property</NavLink>}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* <!-- Right Side Menu (Logged Out) --> */}
            {status === "unauthenticated" && (
              <div className="hidden sm:block">
                <div className="flex items-center">
                  <LogInButton onClick={() => signIn("google")} />
                </div>
              </div>
            )}

            {/* <!-- Right Side Menu (Logged In) --> */}
            {status === "authenticated" && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationsMenu />
                {/* <!-- Profile dropdown button --> */}
                <div className="relative ml-3">
                  <ProfileMenu profileImg={profileImg} signOut={signOut} />
                </div>
              </div>
            )}

            {status === "loading" && <MiniSpinner />}
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink href="/" className="block">
              Home
            </NavLink>
            <NavLink href="/properties">Properties</NavLink>
            {session && <NavLink href="/properties/add">Add Property</NavLink>}

            {!session && (
              <div className="md:hidden ">
                <div className="flex items-center">
                  <LogInButton onClick={() => signIn("google")} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
