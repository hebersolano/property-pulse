// services are functions that server components use instead of api routes
import dbConnect from "@/config/dbConnect";
import Property from "@/config/models/Property";

export async function getFeaturedProperties() {
  try {
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
