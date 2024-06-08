import PropertySearchForm from "@/components/PropertySearchForm";
import { GET as getApiSearchProperties } from "@/app/api/properties/search/route";
import Pagination from "@/components/Pagination";
import Properties from "@/components/Properties";

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
      <PropertySearchForm searchParams={searchParams} />

      <Properties properties={properties} />

      <Pagination />
    </>
  );
}

export default PropertiesPage;
