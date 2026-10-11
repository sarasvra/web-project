import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Truck, XCircle } from "lucide-react";

import { getProduct } from "@/lib/api/product";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductActions from "@/components/product/ProductActions";
import EmptyState from "@/components/empty/EmptyState";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product = undefined;
  try {
       product = await getProduct(slug);
  } catch {
    return(
      <>
      <Navbar />
              <EmptyState
                  title="محصولی یافت نشد."
                  description={""}
                />
          <Footer />
       </>     
         );
  }
 

  const discountedPrice = Math.round(
    product.price * (1 - product.discount / 100)
  );

  const isAvailable = product.stock > 0;

  return (
  <div className="pb-24 sm:pb-0">
    <Navbar />
      <main dir="rtl" className="min-h-screen ">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            {/* تصویر */}
          <div className="flex w-full items-center justify-center">
  <div className="relative aspect-square w-full max-w-[360px] overflow-hidden rounded-[28px] bg-[#EEEAE5]">
    <Image
      src={product.image}
      alt={product.name}
      fill
      priority
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 360px"
    />

    {product.discount > 0 && (
      <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-[#8B5E4B] shadow-sm">
        {product.discount}٪ تخفیف
      </span>
    )}
  </div>
</div>

            {/* اطلاعات */}
            <div className="flex flex-col py-1 lg:py-6">
              <h1 className="text-2xl font-black leading-[1.7] tracking-tight text-[#292725] sm:text-3xl">
                {product.name}
              </h1>

              <div className="mt-4 h-px w-16 bg-[#B99B82]" />

              <p className="mt-6 max-w-xl text-sm leading-8 text-[#716C67]">
                {product.description}
              </p>

              {/* قیمت */}
              <div className="mt-8">
                {product.discount > 0 ? (
                  <div className="flex flex-wrap items-end gap-3">
                    <span className="text-sm text-[#A29C96] line-through">
                      {product.price.toLocaleString("fa-IR")} تومان
                    </span>

                    <span className="text-2xl font-black text-[#292725]">
                      {discountedPrice.toLocaleString("fa-IR")}
                    </span>

                    <span className="mb-1 text-xs text-[#77716B]">
                      تومان
                    </span>
                  </div>
                ) : (
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-[#292725]">
                      {product.price.toLocaleString("fa-IR")}
                    </span>

                    <span className="mb-1 text-xs text-[#77716B]">
                      تومان
                    </span>
                  </div>
                )}
              </div>

              {/* موجودی */}
              <div
                className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${
                  isAvailable
                    ? "border-[#D9E8DC] bg-[#F5FAF6] text-[#4D7A58]"
                    : "border-[#E9D8D8] bg-[#FCF6F6] text-[#A35D5D]"
                }`}
              >
                {isAvailable ? (
                  <CheckCircle2 size={16} strokeWidth={2} />
                ) : (
                  <XCircle size={16} strokeWidth={2} />
                )}

                <span>{isAvailable ? "موجود" : "ناموجود"}</span>
              </div>

              {/* عملیات */}
               <div className="mt-8">
                    <ProductActions product={product} />
               </div>

              {/* اطلاعات تکمیلی */}
              <div className="mt-8 grid gap-4 border-t border-[#E7E2DC] pt-7 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEEAE5] text-[#806C5D]">
                    <Truck size={18} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#393633]">
                      ارسال سفارش
                    </p>
                    <p className="mt-1 text-[11px] text-[#8A847E]">
                      بسته‌بندی مناسب و ایمن
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEEAE5] text-[#806C5D]">
                    <ShieldCheck size={18} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#393633]">
                      خرید مطمئن
                    </p>
                    <p className="mt-1 text-[11px] text-[#8A847E]">
                      بسته‌بندی ایمن محصول
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/products"
                className="mt-8 inline-flex w-fit items-center text-xs font-bold text-[#806C5D] transition-colors hover:text-[#5F5045]"
              >
                ← بازگشت به محصولات
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}