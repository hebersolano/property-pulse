"use client";
import { deleteProperty } from "@/config/services/propertiesApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

function UserListing({ property }) {
  const router = useRouter();
  const image = property.images[0];
  return (
    <div className="mb-10">
      <a href="/property.html">
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={image}
          alt={property.name}
          sizes="(min-width: 1024px) 29vw, (min-width: 768px) 44vw, 89vw"
          width={16}
          height={9}
        />
      </a>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">{property.location.city + " " + property.location.state}</p>
      </div>
      <div className="mt-2">
        <a
          href="/add-property.html"
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </a>
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
