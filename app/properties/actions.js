"use server";

import { redirect } from "next/navigation";

export async function handleSearchQueries(formData) {
  "use server";
  const location = formData.get("location");
  const propertyType = formData.get("property-type");
  if (!location && propertyType === "All") redirect("/properties");
  const locationQuery = location ? `&location=${location}` : "";
  redirect(`/properties?type=${propertyType + locationQuery}`);
}
