"use client";

import LoadingPage from "@/app/loading";
import ContactForm from "@/components/ContactForm";
import PropertyDetails from "@/components/Navbar/PropertyDetails";
import PropertyHederImage from "@/components/PropertyHederImage";
import PropertyInfo from "@/components/PropertyInfo";
import { getProperty } from "@/config/services/propertiesApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function PropertyPage() {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(
    function () {
      getProperty(id)
        .then((res) => setProperty(res))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    },
    [id]
  );

  if (isLoading) return <LoadingPage />;

  if (!property && !isLoading)
    return <h1 className="text-center text-xl2 font-bold mt-10">Property Not Found</h1>;

  console.log(property);

  return (
    <>
      <PropertyHederImage image={property.images[0]} />

      <section className="bg-blue-50">
        <div className="container-xl m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />

            <aside className="space-y-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                <i className="fas fa-bookmark mr-2"></i> Bookmark Property
              </button>

              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                <i className="fas fa-share mr-2"></i> Share Property
              </button>

              <ContactForm />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default PropertyPage;
