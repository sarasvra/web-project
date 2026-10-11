import Link from "next/link";
import { FaGlasses, FaShoppingBag, FaKey } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/empty/EmptyState";
import { getCategories } from "@/lib/api/category";

const categoryIcons = {
  glasses_holder: FaGlasses,
  key: FaKey,
  phone_design: FiSmartphone,
  bag_charm: FaShoppingBag,
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="bg-[#FBF9FF]">
      <Navbar />

      <main dir="rtl" className="min-h-screen  px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-1.5 rounded-full bg-[#C9825B]" />
              <h1 className="text-2xl font-black text-[#292332] sm:text-3xl">
                دسته‌بندی محصولات
              </h1>
            </div>

            <p className="mt-2 pr-4 text-xs text-[#77717F] sm:text-sm">
              محصولات دست‌ساز را بر اساس دسته‌بندی پیدا کنید
            </p>
          </div>

          {categories.length === 0 ? (
            <EmptyState
              title="دسته‌بندی‌ای وجود ندارد"
              description="در حال حاضر دسته‌بندی‌ای برای نمایش وجود ندارد."
            />
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {categories.map((category) => {
                const Icon =
                  categoryIcons[
                    category.slug as keyof typeof categoryIcons
                  ];

                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${encodeURIComponent(category.slug)}`}
                    className="group flex min-h-[150px] w-full flex-col items-center justify-center rounded-[28px] border border-[#E5E2DF] bg-white px-4 py-5 text-center shadow-[0_5px_18px_rgba(48,48,48,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8FB8C7] hover:shadow-[0_12px_25px_rgba(91,124,141,0.10)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D9E6EB] text-[#6F9EAF] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#C9825B] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#C9825B]/20">
                      {Icon && (
                        <Icon
                          size={23}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                    </div>

                    <h2 className="mt-3 text-sm font-extrabold text-[#292332] transition-colors duration-300 group-hover:text-[#C9825B] sm:text-base">
                      {category.name}
                    </h2>

                    {category.description && (
                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#77717F] sm:text-sm">
                        {category.description}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}