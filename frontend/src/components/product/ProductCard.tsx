import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, discount, image, slug } = product;
  const discountedPrice = Math.round(price * (1 - discount / 100));
  const href = `/product/${slug}`;

  return (
   <div className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#E5E2DF] bg-white shadow-[0_5px_20px_rgba(48,48,48,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8FB8C7] hover:shadow-[0_12px_30px_rgba(91,124,141,0.12)]">
      <Link href={href} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#D9E6EB]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
          />

          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-[#C9825B] px-3 py-1.5 text-[9px] font-bold text-white shadow-sm">
              {discount}٪ تخفیف
            </span>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#303030]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>

     <div className="flex-1 p-3.5 sm:p-4">
  <Link href={href}>
    <h3 className="truncate text-xs font-bold text-[#303030] transition-colors duration-300 group-hover:text-[#8FB8C7] sm:text-sm">
      {name}
    </h3>
  </Link>

  <div className="mt-3.5">
    {discount > 0 ? (
      <div className="flex flex-col">
        <span className="text-[10px] text-[#999999] line-through sm:text-xs">
          {price.toLocaleString("fa-IR")} تومان
        </span>
        <span className="text-xs font-extrabold text-[#5B7C8D] sm:text-sm">
          {discountedPrice.toLocaleString("fa-IR")}
          <span className="mr-1 text-[10px] font-medium text-[#777777] sm:text-xs">
            تومان
          </span>
        </span>
      </div>
    ) : (
      <span className="text-xs font-extrabold text-[#5B7C8D] sm:text-sm">
        {price.toLocaleString("fa-IR")}
        <span className="mr-1 text-[10px] font-medium text-[#777777] sm:text-xs">
          تومان
        </span>
      </span>
    )}
  </div>
</div>

<Link
  href={href}
  className="flex w-full items-center justify-center gap-1.5 border-t border-[#E5E2DF]/60 py-2.5 text-xs font-semibold text-[#5B7C8D] transition-colors duration-300 hover:bg-[#5B7C8D] hover:text-white sm:text-sm"
>
  مشاهده جزئیات
  <ArrowLeft size={15} strokeWidth={2} />
</Link>
    </div>
  );
}