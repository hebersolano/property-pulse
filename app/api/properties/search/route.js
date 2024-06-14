import dbConnect from "@/db/dbConnect";
import Property from "@/db/models/Property";

const sortSchema = {
  asc: 1,
  desc: -1,
  [1]: "asc",
  [-1]: "desc",
};

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req?.url || process.env.NEXT_PUBLIC_DOMAIN);
    const location = searchParams.get("location") || req.location;
    const propertyType = searchParams.get("type") || req.type;
    const page = searchParams.get("page") || req.type || 1;
    const sort = sortSchema[searchParams.get("sort") || req.sort] || -1;

    const options = {
      page,
      limit: 9,
      collation: {
        locale: "en",
      },
      sort: { createdAt: sort },
    };

    let query = {};

    if (!location && !propertyType) {
      const properties = await Property.paginate(query, options);
      if (!req.url) return properties;
      return new Response(JSON.stringify(properties), { status: 200 });
    }

    // Match location pattern against database fields
    if (location) {
      const locationPattern = new RegExp(location, "i");
      query.$or = [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ];
    }

    // only check for property
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.$and = [{ type: typePattern }];
    }

    const properties = await Property.paginate(query, options);

    if (!req.url) return properties;
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.error("Server Error: search property", error);
    if (!req.url) return [];
    return new Response("Server Error", { status: 500 });
  }
}
