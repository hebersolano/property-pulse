"use client";
import { deleteProperty } from "@/lib/api-services/apiProperty";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserListing({ property }) {
  const router = useRouter();
  const image = property.images[0];
  return (
    <div className="mb-10">
      <Link href="/property.html">
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={image}
          alt={property.name}
          sizes="(min-width: 1024px) 29vw, (min-width: 768px) 44vw, 89vw"
          width={16}
          height={9}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">{property.location.city + " " + property.location.state}</p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            deleteProperty(property._id);
            router.refresh();
          }}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserListing;
