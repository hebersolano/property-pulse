// import properties from "@/properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import FeaturedProperty from "./FeaturedProperty";
import { fetchProperties } from "@/config/services/propertiesApi";
import FeaturedProperties from "./FeaturedProperties";
import RecentProperties from "./RecentProperties";

async function HomeProperties() {
  const properties = await fetchProperties();

  let recentProperties = properties.slice(0, 3);
  let featuredProperties = properties.filter((property) => property.is_featured).slice(0, 2);

  return (
    <>
      <FeaturedProperties />
      <RecentProperties />

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
