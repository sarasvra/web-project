import type { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ProductsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};

export async function getProductsPage(
  page = 1,
  category?: string,
  latest = false,
  search?: string,
  minimumPrice?: number,
  maximumPrice?: number,
  sort?: string,
  discounted = false
): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (category) {
    params.set("category", category);
  }

  if (latest) {
    params.set("latest", "true");
  }

  if (search) {
    params.set("search", search);
  }

  if(minimumPrice !== undefined) {
    params.set("minimum_price" , String(minimumPrice))
  }

  if(maximumPrice !== undefined) {
    params.set("maximum_price" , String(maximumPrice))
  }

  if(sort) {
    params.set("sort" , sort)
  }

  if(discounted){
    params.set("discounted" , "true")
  }
  
  const response = await fetch(
    `${API_URL}/api/products/?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  return response.json();
}

export async function getHomeProducts(
  count = 10,
  latest = false
): Promise<Product[]> {
  const data = await getProductsPage(1, undefined, latest);

  return data.results.slice(0, count);
}

export async function getLatestProducts(): Promise<Product[]> {
  return getHomeProducts(5, true);
}

export async function getProduct(slug: string): Promise<Product> {
  const response = await fetch(
    `${API_URL}/api/products/${slug}/`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("محصول پیدا نشد");
  }

  return response.json();
}

