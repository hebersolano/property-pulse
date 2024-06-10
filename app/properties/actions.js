"use server";

import { redirect } from "next/navigation";

export async function handleSearchQueries(formData) {
  let params = {};
  const location = formData.get("location");
  if (location) params.location = location;
  const type = formData.get("property-type");
  if (type) params.type = type;
  const sort = formData.get("property-sort");
  if (sort) params.sort = sort;
  // if (!location && propertyType === "All") redirect("/properties");
  // const locationQuery = location ? `&location=${location}` : "";
  redirect(`/properties?${new URLSearchParams(params).toString()}`);
}

export async function handleSortQueries(searchParams) {
  redirect(`/properties?${new URLSearchParams(searchParams).toString()}`);
}
