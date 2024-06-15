// "services" are functions that server components use to retrieve dat at the server side instead of using fetch calls to API routes.
import dbConnect from "@/db/dbConnect";
import Property from "@/db/models/Property";

export async function getProperties() {
  try {
    await dbConnect();
    const properties = await Property.find({});
    if (!properties) return [];
    console.log(properties);
    return properties;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPropertiesIds() {
  try {
    await dbConnect();
    const properties = await Property.find({}).select("_id");
    if (!properties) return [];
    console.log(properties);
    return properties;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFeaturedProperties() {
  try {
    await dbConnect();
    const featuredProperties = await Property.find({ is_featured: { $eq: true } });
    if (featuredProperties.length <= 2) return featuredProperties;

    let randomFeaturedProperties = [];
    let randomIndex = [];

    while (randomFeaturedProperties.length < 2) {
      const random = Math.floor(Math.random() * featuredProperties.length);
      if (!randomIndex.includes(random)) {
        randomFeaturedProperties.push(featuredProperties[random]);
        randomIndex.push(random);
      }
    }

    return randomFeaturedProperties;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getRecentProperties() {
  try {
    await dbConnect();
    const recentProperties = await Property.find({}).sort({ createdAt: -1 }).limit(3);
    return recentProperties;
  } catch (error) {
    console.log(error);
    return [];
  }
}
