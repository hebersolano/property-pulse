import LoadingPage from "@/app/loading";
import ContactForm from "@/components/ContactForm";
import PropertyDetails from "@/components/Navbar/PropertyDetails";
import PropertyHederImage from "@/components/PropertyHederImage";
import properties from "@/properties.json";

import { getProperty } from "@/config/services/propertiesApi";
import { notFound } from "next/navigation";

async function PropertyPage({ params }) {
  const property = await getProperty(params.id);
  if (!property) return notFound();

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
