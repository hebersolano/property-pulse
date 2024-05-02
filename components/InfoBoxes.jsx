import { link } from "fs";
import InfoBox from "./InfoBox";
import { text } from "stream/consumers";

function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            btnInfo={{ link: "/properties", text: "Browse Properties  " }}
          >
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>

          <InfoBox
            heading="For Property Owners"
            bgColor="bg-blue-100"
            btnInfo={{
              link: "/properties/add",
              text: "Add Property",
              bgColor: "bg-blue-500",
              bgHover: "bg-blue-600",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;
