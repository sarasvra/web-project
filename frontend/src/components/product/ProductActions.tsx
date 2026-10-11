"use client";

import { useAuth } from "@/context/AuthContext";
import { addFavorite , removeFavorite , getFavorites } from "@/lib/api/favorites";
import { Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState , useEffect } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

type ProductActionsProps = {
  product: Product;
};



export default function ProductActions({ product }: ProductActionsProps) {
  const { slug, stock } = product;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteError, setFavoriteError] = useState("");
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const isAvailable = stock > 0;
  const { user } = useAuth();

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(t);
  }, [added]);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(product, quantity);
    setAdded(true);
  };

useEffect(() => {
  if (!user) {
    setIsFavorite(false);
    return;
  }

  let active = true;

  const loadFavorite = async () => {
    try {
      const favorites = await getFavorites();
      if (active) {
        setIsFavorite(favorites.some((f) => f.product.slug === slug));
      }
    } catch {
      if (active) setIsFavorite(false);
    }
  };

  loadFavorite();

  return () => {
    active = false;
  };
}, [slug, user]);

  const increase = () => {
    setQuantity((current) => Math.min(current + 1, stock));
  };

  const decrease = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

const handleFavorite = async () => {
  if (!user) {
    setIsFavorite((current) => !current);
    return;
  }

  if (isFavoriteLoading) return;

  try {
    setFavoriteError("");
    setIsFavoriteLoading(true);

    if (isFavorite) {
      await removeFavorite(slug);
      setIsFavorite(false);
    } else {
      await addFavorite(slug);
      setIsFavorite(true);
    }
  } catch (error) {
    console.error(error);
    setFavoriteError(
      isFavorite
        ? "حذف از علاقه‌مندی‌ها انجام نشد."
        : "افزودن به علاقه‌مندی‌ها انجام نشد."
    );
  } finally {
    setIsFavoriteLoading(false);
  }
};


  return (
   <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E7E2DC] bg-white/95 p-3 shadow-[0_-8px_30px_rgba(41,39,37,0.10)] backdrop-blur-md sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2">
        <div className="flex h-12 shrink-0 items-center rounded-2xl border border-[#E2DDD7] bg-[#FAF9F7]">
          <button
            type="button"
            onClick={decrease}
            disabled={!isAvailable || quantity <= 1}
            aria-label="کاهش تعداد"
            className="flex h-12 w-10 items-center justify-center text-[#716C67] transition-colors hover:text-[#292725] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus size={16} />
          </button>

          <span className="flex min-w-8 items-center justify-center text-sm font-bold text-[#292725]">
            {quantity}
          </span>
          
          <button
            type="button"
            onClick={increase}
            disabled={!isAvailable || quantity >= stock}
            aria-label="افزایش تعداد"
            className="flex h-12 w-10 items-center justify-center text-[#716C67] transition-colors hover:text-[#292725] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus size={16} />
          </button>
        </div>

      <button
           type="button"
          onClick={handleFavorite}
          aria-label={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          aria-pressed={isFavorite}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all ${isFavorite ? "border-[#E7CFC9] bg-[#FBF1EF] text-[#B96F61]" : "border-[#E2DDD7] bg-white text-[#716C67]"}`}>
         <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
     </button>
       <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#5F9E72] px-4 text-sm font-bold text-white transition-colors hover:bg-[#4F895F] disabled:cursor-not-allowed disabled:bg-[#D8D5D1]"
       >
           {added ? <Check size={18} /> : <ShoppingBag size={18} />}
               <span className="truncate">
           {!isAvailable ? "ناموجود" : added ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
       </span>
      </button>

      </div>
       {favoriteError && (
         <p className="mt-2 text-xs text-[#B96F61]">
            {favoriteError}
         </p>
      )}
    </div>
  );
}