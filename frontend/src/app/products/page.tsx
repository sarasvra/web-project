import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/empty/EmptyState";
import { getProductsPage } from "@/lib/api/product";
import { getCategory } from "@/lib/api/category";
import ProductFilters from "@/components/product/ProductFilters";
import { getCategories } from "@/lib/api/category";
export default async function ProductsPage({
  searchParams,
}: {
 searchParams: Promise<{
  page?: string;
  category?: string;
  latest?: string;
  search?: string;
  minimum_price?: string;
  maximum_price?: string;
  sort?: string;
  discounted?: string;
}>;
}) {
  const {
  page,
  category,
  latest,
  search,
  minimum_price,
  maximum_price,
  sort,
  discounted,
} = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);
 
  let currentCategory = null;

  let data = undefined;
  
if (category) {
  try {
    currentCategory = await getCategory(category);
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
}

const categories = await getCategories();

  
  try {
      data = await getProductsPage(
     currentPage,
     category,
     latest === "true",
     search,
     minimum_price ? Number(minimum_price) : undefined,
     maximum_price ? Number(maximum_price) : undefined,
     sort,
     discounted === "true"
);
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
  

  return (
    <div className="bg-[#FBF9FF]">
      <Navbar />

      <main dir="rtl" className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div>
           <p className="text-xl font-black text-[#292332] sm:text-2xl">
            {search  ? `نتایج جستجو برای ${search}` : currentCategory ? currentCategory.name : "محصولات"} </p>

            {currentCategory?.description && (
              <p className="mt-2 text-sm leading-7 text-[#77717F]">
                {currentCategory.description}
              </p>
            )}
          </div>

       <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
  <div className="self-start">
    <ProductFilters categories={categories} />
  </div>


  <div className="min-w-0">
    {data.results.length === 0 ? (
      <EmptyState
        title="محصولی یافت نشد."
        description={
          search
            ? `برای «${search}» محصولی پیدا نشد.`
            : currentCategory
              ? `در دسته «${currentCategory.name}» هنوز محصولی برای نمایش وجود ندارد.`
              : "در این بخش هنوز محصولی برای نمایش وجود ندارد."
        }
      />
    ) : (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.results.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    )}
  </div>
</div>

          {(data.previous || data.next) && (
            <div className="mt-12 flex items-center justify-center gap-3">
              {data.previous ? (
                <Link
                  href={`/products?page=${currentPage - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}${latest === "true" ? "&latest=true" : ""}${search ? `&search=${encodeURIComponent(search)}` : ""}
                        ${minimum_price ? `&minimim_price=${encodeURIComponent(minimum_price)}` : ""}${maximum_price ? `&maximum_price=${encodeURIComponent(maximum_price)}` : ""}
                        ${sort ? `&sort=${encodeURIComponent(sort)}` : ""}${discounted === "true" ? "&discounted=true" : ""}`}>
                    ← قبلی
                </Link>
              ) : (
                <span className="cursor-not-allowed rounded-2xl border border-[#F0EDF3] bg-[#F8F7F9] px-5 py-3 text-sm font-bold text-[#C8C3CC]">
                  ← قبلی
                </span>
              )}

              <div className="flex h-11 min-w-11 items-center justify-center rounded-2xl bg-[#F3ECFA] px-4 text-sm font-extrabold text-[#7C3AED]">
                صفحه {currentPage}
              </div>

              {data.next ? (
                <Link
                   href={`/products?page=${currentPage + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}${latest === "true" ? "&latest=true" : ""}${search ? `&search=${encodeURIComponent(search)}` : ""}
                          ${minimum_price ? `&minimum_price=${encodeURIComponent(minimum_price)}` : ""}${maximum_price ? `&maximum_price=${encodeURIComponent(maximum_price)}` : ""}
                          ${sort ? `&sort=${encodeURIComponent(sort)}` : ""}${discounted === "true" ? "&discounted=true" : ""}`}>
                         بعدی →
               </Link>
              ) : (
                <span className="cursor-not-allowed rounded-2xl border border-[#F0EDF3] bg-[#F8F7F9] px-5 py-3 text-sm font-bold text-[#C8C3CC]">
                  بعدی →
                </span>
              )}
            </div>
          )}
        </div>
      </main>
       <Footer />
    </div>
  );
}