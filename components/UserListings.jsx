import { getUserProperties } from "@/config/services/propertiesApi";
import UserListing from "./UserListing";
import { notFound } from "next/navigation";
import propers from "@/properties2.json";

async function UserListings({ userId }) {
  const userProperties = await getUserProperties(userId);

  if (!userProperties) notFound();

  return (
    <div className="md:w-3/4 md:pl-4">
      <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
      {userProperties.map((property) => (
        <UserListing key={property._id} property={property} />
      ))}

      <div>
        <p>fake</p>
        <UserListing property={propers[0]} />
      </div>
    </div>
  );
}

export default UserListings;
