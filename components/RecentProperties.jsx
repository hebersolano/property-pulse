import { getRecentProperties } from "@/app/properties/services";
import PropertyCard from "./PropertyCard";

async function RecentProperties() {
  const recentProperties = await getRecentProperties();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
        {recentProperties.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentProperties;
