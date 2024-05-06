import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

function PropertyHederImage({ image }) {
  return (
    <>
      <section>
        <div className=" m-auto">
          <div className="grid grid-cols-1 overflow-hidden">
            <Image
              src={`/images/properties/${image}`}
              alt=""
              className="object-cover h-[400px] w-full"
              width={16}
              height={9}
              sizes="100vw"
              priority={true}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container-xl m-auto py-6 px-6">
          <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
    </>
  );
}

export default PropertyHederImage;
