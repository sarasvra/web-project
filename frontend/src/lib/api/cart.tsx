const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CartItem = {
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
  quantity: number;
};

export type Cart = {
  id: number;
  items: CartItem[];
  updated_at: string;
};

export async function getCart(): Promise<Cart> {
  try {
    const response = await fetch(`${API_URL}/api/cart/`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      console.error("Cart API error:", response.status, data);

      throw new Error("دریافت سبد خرید انجام نشد.");
    }

    return response.json();
  } catch (error) {
    console.error("getCart error:", error);
    throw new Error("دریافت سبد خرید انجام نشد.");
  }
}

export async function saveCart(
  items: { product_id: number; quantity: number }[]
): Promise<Cart> {
  try {
    const response = await fetch(`${API_URL}/api/cart/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ items }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Save cart API error:", response.status, data);

      throw new Error("ذخیره سبد خرید انجام نشد.");
    }

    return data;
  } catch (error) {
    console.error("saveCart error:", error);
    throw new Error("ذخیره سبد خرید انجام نشد.");
  }
}