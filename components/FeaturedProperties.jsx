import { getFeaturedProperties } from "@/lib/services/property-services";
import FeaturedProperty from "./FeaturedProperty";

async function FeaturedProperties() {
  let featuredProperties = await getFeaturedProperties();

  return (
    <section className=" bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
        {featuredProperties.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProperties.map((property) => (
              <FeaturedProperty key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProperties;
