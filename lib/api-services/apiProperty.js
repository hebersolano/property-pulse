import toast from "react-hot-toast";

const NEXT_API = process.env.NEXT_PUBLIC_API || null;

export async function fetchProperties() {
  try {
    if (!NEXT_API) return [];

    const res = await fetch(`${NEXT_API}/properties`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch data");

    const properties = await res.json();
    return properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.log(error);
  }
}

export async function getProperty(id) {
  try {
    const res = await fetch(`${NEXT_API}/properties/${id}`, { cache: "no-cache" });
    if (!res.ok) return undefined;

    const property = await res.json();

    return property;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addProperty(data) {
  try {
    let imagesPostRes;

    if (data.images.length > 0) {
      const formData = new FormData();
      for (const image of data.images) {
        formData.append("images", image, image.name);
      }

      imagesPostRes = await fetch(`${NEXT_API}/properties?type=file`, {
        method: "POST",
        body: formData,
      });
    }

    let dataPostRes = await fetch(`${NEXT_API}/properties?type=json`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!imagesPostRes.ok && !dataPostRes.ok) toast.error("Error creating new property");
    toast.success("Property created");
    return await dataPostRes.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function editProperty(data) {
  try {
    const res = await fetch(`${NEXT_API}/properties`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!res.ok) toast.error("Error updating property");
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserProperties(userId) {
  try {
    const res = await fetch(`${NEXT_API}/properties/user/${userId}`, { cache: "no-cache" });
    if (!res.ok) return [];

    const properties = await res.json();

    return properties;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProperty(propertyId) {
  try {
    const res = await fetch(`${NEXT_API}/properties/${propertyId}`, { method: "DELETE" });
    console.log(res);
    if (!res.ok) toast.error("Failed to delete property");

    toast.success("Property deleted");
  } catch (error) {
    console.log(error);
  }
}

export async function addPropertyToBookmarks(id) {
  try {
    const res = await fetch(`${NEXT_API}/properties/bookmarks?propertyId=${id}`, {
      method: "POST",
    });
    if (!res.ok) return false;
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkPropertyIsBookmarked(id) {
  try {
    const res = await fetch(`${NEXT_API}/properties/bookmarks/check?propertyId=${id}`);

    if (!res.ok) return false;
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
