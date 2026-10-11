import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

type ProductCarouselProps = {
  title: string;
  subtitle: string;
  seeAllHref?: string;
  products?: Product[];
  emptyMessage?: string;
  className?: string; // اضافه شد
};

export default function ProductCarousel({
  title,
  subtitle,
  seeAllHref = "",
  products = [],
  emptyMessage = "محصولی وجود ندارد.",
  className = "",
}: ProductCarouselProps) {
  return (
   <section dir="rtl" className="pt-30 px-5 sm:px-6">
      <div  className={`mx-auto w-full max-w-7xl ${className}`}>
    
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-1.5 rounded-full bg-[#C9825B]" />
              <h2 className="text-lg font-extrabold text-[#303030] sm:text-xl">
                {title}
              </h2>
            </div>
            <p className="mt-1.5 pr-4 text-[11px] text-[#777777] sm:text-xs">
              {subtitle}
            </p>
          </div>

          <Link
            href={seeAllHref}
            className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#6F9EAF] transition-all duration-300 hover:bg-[#D9E6EB] sm:text-sm"
          >
            مشاهده همه
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        </div>

        {products.length === 0 ? (
          <p>{emptyMessage}</p>
        ) : (
          <div className="overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-3.5 sm:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[50vw] shrink-0 sm:w-[300px] md:w-[250px] lg:w-[235px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </section>
  );
}