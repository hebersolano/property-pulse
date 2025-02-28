import Image from "next/image";
import logo from "@/assets/images/logo.png";
import UploadFakeProperties from "@/lib/api-services/seed/UploadFakeProperties";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" height={32} width={32} />
        </div>

        {/* <UploadFakeProperties /> */}

        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties.html">Properties</Link>
            </li>
            <li>
              <Link href="/terms.html">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; 2024 PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
