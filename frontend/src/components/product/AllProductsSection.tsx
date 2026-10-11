import { getHomeProducts } from "@/lib/api/product";
import ProductCarousel from "./ProductCarousel";


export default async function AllProductsSection() {
  try {
    const products = await getHomeProducts();

  return (
    <ProductCarousel
      title="محصولات ما"
      subtitle="انتخابی خاص از محصولات دست‌ساز"
      seeAllHref="/products"
      products={products}
    />
   );
  } catch{
    return (
      <ProductCarousel
      title="محصولات ما"
      subtitle="انتخابی خاص از محصولات دست‌ساز"
      seeAllHref="/products"
    />
    );
  }

}