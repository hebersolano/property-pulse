import properties from "@/properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

function HomeProperties() {
  let recentProperties = properties.slice(0, 3);
  let featuredProperties = properties.filter((property) => property.is_featured).slice(0, 2);

  return (
    <>
      {/*  Featured Properties */}
      <section class="bg-blue-50 px-4 pt-6 pb-10">
        <div class="container-xl lg:container m-auto">
          <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
          {properties.length === 0 ? (
            <div>No properties found</div>
          ) : (
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
          {properties.length === 0 ? (
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

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}

export default HomeProperties;
