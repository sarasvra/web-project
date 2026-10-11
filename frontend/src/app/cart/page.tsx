"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/empty/EmptyState";
import { useCart } from "@/context/CartContext";

function getUnitPrice(price: number, discount: number) {
  return discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
}

export default function CartPage() {
  const {
    items,
    isInitialized,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div>
      <Navbar />

      <main dir="rtl" className="min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-14">
          {!isInitialized ? (
            <div className="h-64 animate-pulse rounded-[28px] bg-[#EEEAE5]" />
          ) : items.length === 0 ? (
            <EmptyState title="سبد خرید شما خالی است." description="" />
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-black text-[#292725]">
                  سبد خرید
                  <span className="mr-2 text-sm font-medium text-[#8A847E]">
                    ({totalItems.toLocaleString("fa-IR")} کالا)
                  </span>
                </h1>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-[#B96F61] transition-colors hover:text-[#96564A]"
                >
                  خالی کردن سبد
                </button>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
                {/* لیست آیتم‌ها */}
                <ul className="flex flex-col gap-4">
                  {items.map(({ product, quantity }) => {
                    const unit = getUnitPrice(product.price, product.discount);

                    return (
                      <li
                        key={product.slug}
                        className="flex gap-4 rounded-[24px] border border-[#E7E2DC] bg-white p-3 sm:p-4"
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-[#EEEAE5] sm:w-28"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${product.slug}`}
                              className="line-clamp-2 text-sm font-bold text-[#292725] hover:text-[#5B7C8D]"
                            >
                              {product.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.slug)}
                              aria-label={`حذف ${product.name} از سبد`}
                              className="shrink-0 text-[#A29C96] transition-colors hover:text-[#B96F61]"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          {product.description && (
                            <p className="mt-1 line-clamp-2 text-[11px] leading-6 text-[#8A847E]">
                                {product.description}
                           </p>
                          )}

                          <div className="flex flex-wrap items-end justify-between gap-3">
                            <div className="flex h-10 items-center rounded-2xl border border-[#E2DDD7] bg-[#FAF9F7]">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(product.slug, quantity - 1)
                                }
                                disabled={quantity <= 1}
                                aria-label="کاهش تعداد"
                                className="flex h-10 w-9 items-center justify-center text-[#716C67] hover:text-[#292725] disabled:opacity-30"
                              >
                                <Minus size={15} />
                              </button>

                              <span className="min-w-7 text-center text-sm font-bold text-[#292725]">
                                {quantity.toLocaleString("fa-IR")}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(product.slug, quantity + 1)
                                }
                                disabled={quantity >= product.stock}
                                aria-label="افزایش تعداد"
                                className="flex h-10 w-9 items-center justify-center text-[#716C67] hover:text-[#292725] disabled:opacity-30"
                              >
                                <Plus size={15} />
                              </button>
                            </div>

                            <div className="flex flex-col items-end">
                              {product.discount > 0 && (
                                <span className="text-[11px] text-[#A29C96] line-through">
                                  {(product.price * quantity).toLocaleString(
                                    "fa-IR"
                                  )}
                                </span>
                              )}
                              <span className="text-sm font-extrabold text-[#5B7C8D]">
                                {(unit * quantity).toLocaleString("fa-IR")}
                                <span className="mr-1 text-[11px] font-medium text-[#777777]">
                                  تومان
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* خلاصه سفارش */}
                <aside className="rounded-[24px] border border-[#E7E2DC] bg-white p-5 lg:sticky lg:top-24">
                  <h2 className="text-base font-black text-[#292725]">
                    خلاصه سفارش
                  </h2>

                  <div className="mt-5 flex items-center justify-between text-sm text-[#716C67]">
                    <span>تعداد کالا</span>
                    <span>{totalItems.toLocaleString("fa-IR")}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#E7E2DC] pt-4">
                    <span className="text-sm font-bold text-[#292725]">
                      مبلغ قابل پرداخت
                    </span>
                    <span className="text-lg font-black text-[#292725]">
                      {totalPrice.toLocaleString("fa-IR")}
                      <span className="mr-1 text-xs font-medium text-[#77716B]">
                        تومان
                      </span>
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-[#5F9E72] text-sm font-bold text-white transition-colors hover:bg-[#4F895F]"
                  >
                    ادامه و ثبت سفارش
                  </Link>

                  <Link
                    href="/products"
                    className="mt-3 block text-center text-xs font-bold text-[#806C5D] hover:text-[#5F5045]"
                  >
                    ← ادامه خرید
                  </Link>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}