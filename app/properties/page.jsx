import Pagination from "@/components/Pagination";
import Properties from "@/components/Properties";
import PropertySearchForm from "@/components/property-form/PropertySearchForm";
import { Suspense } from "react";
import LoadingPage from "../loading";

export const dynamic = "force-dynamic";

function PropertiesPage({ searchParams }) {
  return (
    <>
      <PropertySearchForm searchParams={searchParams} useSort={true} />

      <Suspense fallback={LoadingPage}>
        <Properties searchParams={searchParams} />
        <Pagination searchParams={searchParams} />
      </Suspense>
    </>
  );
}

function loading(params) {}

export default PropertiesPage;
