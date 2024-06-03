import BookmarkButton from "@/components/BookmarkButton";
import ContactForm from "@/components/ContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHederImage from "@/components/PropertyHederImage";
import ShareButton from "@/components/ShareButton";

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
              <BookmarkButton propertyId={property._id} />
              <ShareButton property={property} />
              <ContactForm />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default PropertyPage;
