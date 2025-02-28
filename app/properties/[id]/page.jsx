import { notFound } from "next/navigation";

import { getProperty } from "@/lib/api-services/apiProperty";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import ContactForm from "@/components/message/ContactFormBox";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHederImage from "@/components/PropertyHederImage";
import ShareButton from "@/components/property-form/ShareButton";
import { getProperties, getPropertiesIds } from "@/lib/services/property-services";

// export async function getStaticPaths() {
//   const propertiesId = await getPropertiesIds();
//   const paths = propertiesId.map((propertyId) => ({
//     params: { id: propertyId._id.toString() },
//   }));
//   console.log(paths);
//   return { paths, fallback: false };
// }

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
              <ContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default PropertyPage;
