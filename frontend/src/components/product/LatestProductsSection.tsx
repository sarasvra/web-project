import ProductCarousel from "./ProductCarousel";
import { getLatestProducts } from "@/lib/api/product";

export default async function LatestProductsSection() {
try {
    const products = await getLatestProducts();

  return (
    <ProductCarousel
      title="جدیدترین‌ها"
      subtitle="تازه‌ترین محصولات دست‌ساز Nell clayArt"
      seeAllHref="/products?latest=true"
      products={products}
      className="overflow-hidden rounded-[30px] bg-gradient-to-br from-[#9F000F] via-white to-[#9F000F] px-4 py-8 sm:px-6 md:px-8 lg:px-10"
    />
  );
  } catch {
     return (
       <ProductCarousel
      title="جدیدترین‌ها"
      subtitle="تازه‌ترین محصولات دست‌ساز Nell clayArt"
      emptyMessage="محصول جدیدی وجود ندارد."
      className="overflow-hidden rounded-[30px] bg-gradient-to-br from-[#9F000F] via-white to-[#9F000F] px-4 py-8 sm:px-6 md:px-8 lg:px-10"
    />
     );
  }
}