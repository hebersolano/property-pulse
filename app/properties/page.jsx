import PropertySearchForm from "@/components/PropertySearchForm";
import { GET as getApiSearchProperties } from "@/app/api/properties/search/route";
import Pagination from "@/components/Pagination";
import Properties from "@/components/Properties";

async function PropertiesPage({ searchParams }) {
  const properties = await getApiSearchProperties(searchParams);

  return (
    <>
      <PropertySearchForm searchParams={searchParams} useSort={true} />

      <Properties properties={properties.docs} />

      <Pagination paginate={{ ...properties, docs: null }} />
    </>
  );
}

export default PropertiesPage;
