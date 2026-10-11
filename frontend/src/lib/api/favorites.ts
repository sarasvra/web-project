const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Favorite = {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: number;
    image: string;
    stock: number;
    discount: number;
  };
  created_at: string;
};

export async function getFavorites(): Promise<Favorite[]> {
  const response = await fetch(`${API_URL}/api/favorites/`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت علاقه‌مندی‌ها");
  }

  return response.json();
}

export async function addFavorite(slug: string) {
  const response = await fetch(`${API_URL}/api/favorites/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      product_slug: slug,
    }),
  });

  const data = await response.json();

  console.log("Favorite response:", response.status, data);

  if (!response.ok) {
    throw new Error(
      data?.detail || JSON.stringify(data) || "خطا در افزودن به علاقه‌مندی‌ها"
    );
  }

  return data;
}

export async function removeFavorite(slug: string) {
  const response = await fetch(
    `${API_URL}/api/favorites/${encodeURIComponent(slug)}/`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("خطا در حذف از علاقه‌مندی‌ها");
  }
}