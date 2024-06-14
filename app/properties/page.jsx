import { GET as getApiSearchProperties } from "@/app/api/properties/search/route";
import Pagination from "@/components/Pagination";
import Properties from "@/components/Properties";
import PropertySearchForm from "@/components/property-form/PropertySearchForm";

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
