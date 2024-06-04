import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { GET as getApiSearchProperties } from "@/app/api/properties/search/route";

async function getSearchProperties(location, type) {
  try {
    const res = await getApiSearchProperties({ location, type });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function PropertiesPage({ params, searchParams }) {
  const properties = await getSearchProperties(searchParams.location, searchParams.type);

  return (
    <>
      <section class="bg-blue-700 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
          <PropertySearchForm searchParams={searchParams} />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
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
    </>
  );
}

export default PropertiesPage;
