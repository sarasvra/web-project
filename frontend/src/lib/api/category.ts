import type { Category } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CategoriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
};

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت دسته‌بندی‌ها");
  }

  const data: CategoriesResponse = await response.json();

  return data.results;
}

export async function getCategory(slug: string): Promise<Category> {
  const response = await fetch(
    `${API_URL}/api/categories/${slug}/`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("دسته‌بندی پیدا نشد");
  }

  return response.json();
}


