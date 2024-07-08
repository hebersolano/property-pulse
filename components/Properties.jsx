import PropertyCard from "./PropertyCard";
import { GET as getApiSearchProperties } from "@/app/api/properties/search/route";

async function Properties({ searchParams }) {
  const properties = await getApiSearchProperties(searchParams);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.docs?.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {properties.docs?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Properties;
