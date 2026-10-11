"use client";

import Link from "next/link";

import { Heart, ShoppingBag, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";

import ProductCard from "@/components/product/ProductCard";

import { useAuth } from "@/context/AuthContext";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import {
  getFavorites,
  removeFavorite,
  type Favorite,
} from "@/lib/api/favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingSlug, setRemovingSlug] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { isLoading: authLoading, isLoggedIn } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

  const loadFavorites = async () => {
    try {
      setError("");

      const data = await getFavorites();

      setFavorites(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  loadFavorites();

  }, [authLoading, isLoggedIn]);

  const handleRemove = async (slug: string) => {
  if (removingSlug) return;

  try {
    setError("");
    setRemovingSlug(slug);

    await removeFavorite(slug);

    setFavorites((current) =>
      current.filter(
        (favorite) => favorite.product.slug !== slug
      )
    );
  } catch (error) {
    console.error(error);
    setError("حذف محصول از علاقه‌مندی‌ها انجام نشد.");
  } finally {
    setRemovingSlug(null);
  }
};

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#292725]">
            علاقه‌مندی‌ها
          </h1>

          <p className="mt-2 text-sm text-[#716C67]">
            محصولاتی که ذخیره کرده‌ای
          </p>
        </div>
         {error && (
          <div className="mb-5 rounded-2xl border border-[#E8C7C1] bg-[#FBF1EF] px-4 py-3 text-sm text-[#B96F61]">
             {error}
         </div>
       )}

        {authLoading ? (
          <div className="py-20 text-center text-sm text-[#716C67]">
            در حال بررسی حساب کاربری...
          </div>
        ) : !isLoggedIn ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E2DC] bg-white px-6 py-20 text-center">
            <Heart
              size={42}
              strokeWidth={1.5}
              className="text-[#B9B1AA]"
            />

            <h2 className="mt-5 text-lg font-bold text-[#292725]">
              برای مشاهده علاقه‌مندی‌ها وارد حساب کاربری شوید
            </h2>

            <p className="mt-2 max-w-md text-sm leading-7 text-[#716C67]">
              برای ذخیره و مشاهده محصولات مورد علاقه‌ات، ابتدا وارد حساب کاربری شو.
            </p>

            <Link
              href="/login?next=/favorites"
              className="mt-6 flex items-center gap-2 rounded-2xl bg-[#5F9E72] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#4F895F]"
            >
              <ShoppingBag size={17} />
              ورود به حساب کاربری
            </Link>
          </div>
        ) : loading ? (
          <div className="py-20 text-center text-sm text-[#716C67]">
            در حال دریافت علاقه‌مندی‌ها...
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E2DC] bg-white px-6 py-20 text-center">
            <Heart
              size={42}
              strokeWidth={1.5}
              className="text-[#B9B1AA]"
            />

            <h2 className="mt-5 text-lg font-bold text-[#292725]">
              هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌ای
            </h2>

            <p className="mt-2 text-sm text-[#716C67]">
              محصولاتی که دوست داری را با قلب ذخیره کن.
            </p>

            <Link
              href="/products"
              className="mt-6 flex items-center gap-2 rounded-2xl bg-[#5F9E72] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#4F895F]"
            >
              <ShoppingBag size={17} />
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
  {favorites.map((favorite) => {
    const product = favorite.product;
    const isRemoving = removingSlug === product.slug;

    return (
      <div key={favorite.id} className="relative">
        <ProductCard product={product} />

        <button
          type="button"
          onClick={() => handleRemove(product.slug)}
          disabled={isRemoving}
          aria-label="حذف از علاقه‌مندی‌ها"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#B96F61] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#FBF1EF] disabled:cursor-wait disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  })}
</div>
        )}
      </main>

      <Footer />
    </div>
  );
}