import PropertySearchForm from "@/components/PropertySearchForm";
import { GET as getApiSearchProperties } from "@/app/api/properties/search/route";
import Pagination from "@/components/Pagination";
import Properties from "@/components/Properties";

async function PropertiesPage({ params, searchParams }) {
  const properties = await getApiSearchProperties(searchParams);

  return (
    <>
      <PropertySearchForm searchParams={searchParams} />

      <Properties properties={properties} />

      <Pagination />
    </>
  );
}

export default PropertiesPage;
