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
    if (!res.ok) throw new Error("Failed to fetch data");

    const property = await res.json();

    return property;
  } catch (error) {
    console.log(error);
  }
}

export async function addProperty(data) {
  try {
    console.log("adding property:", data);

    if (data.images.length > 0) {
      const formData = new FormData();
      for (const image of data.images) {
        formData.append("images", image, image.name);
      }

      await fetch(`${NEXT_API}/properties?type=file`, {
        method: "POST",
        body: formData,
      });
    }

    await fetch(`${NEXT_API}/properties?type=json`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserProperties(userId) {
  try {
    const res = await fetch(`${NEXT_API}/properties/user/${userId}`, { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to fetch data");

    const properties = await res.json();

    return properties;
  } catch (error) {
    console.log(error);
  }
}
