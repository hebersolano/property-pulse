import PropertyCard from "@/components/PropertyCard";
import { getUserBookmarks } from "@/config/services/propertiesApi";
import getUserSession from "@/config/userSessionServer";
import { headers } from "next/headers";

async function PropertiesSavedPage() {
  const properties = await getUserBookmarks();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        {properties?.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PropertiesSavedPage;
