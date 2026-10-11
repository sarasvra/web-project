import Link from "next/link";
import { FaGlasses, FaShoppingBag, FaKey } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { getCategories } from "@/lib/api/category";

const categoryIcons = {
  glasses_holder: FaGlasses,
  key: FaKey,
  phone_design: FiSmartphone,
  bag_charm: FaShoppingBag,
};

export default async function CategorySection() {
  const categories = await getCategories();
  const homeCategories = categories.slice(0, 4);

  return (
    <section dir="rtl" className="pt-30 px-5 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-1.5 rounded-full bg-[#C9825B]" />
              <h2 className="text-lg font-extrabold text-[#303030] sm:text-xl">
                دسته‌بندی محصولات
              </h2>
            </div>

            <p className="mt-1.5 pr-4 text-[11px] text-[#777777] sm:text-xs">
              محصولات دست‌ساز برای انتخابی خاص
            </p>
          </div>

          <Link
            href="/categories"
            className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#6F9EAF] transition-all duration-300 hover:bg-[#D9E6EB] sm:text-sm"
          >
            مشاهده همه
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {homeCategories.map((category) => {
            const Icon =
              categoryIcons[category.slug as keyof typeof categoryIcons];

            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group flex min-h-[125px] w-full flex-col items-center justify-center rounded-[26px] border border-[#E5E2DF] bg-white px-3 py-4 shadow-[0_5px_18px_rgba(48,48,48,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8FB8C7] hover:shadow-[0_12px_25px_rgba(91,124,141,0.10)] sm:min-h-[135px] sm:rounded-[30px]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9E6EB] text-[#6F9EAF] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#C9825B] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#C9825B]/20 sm:h-14 sm:w-14">
                  {Icon && (
                    <Icon
                      size={22}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>

                <span className="mt-3 text-center text-xs font-bold text-[#303030] transition-colors duration-300 group-hover:text-[#C9825B] sm:text-sm">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}