"use client";

import { Check, ChevronDown, Filter, X } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Category } from "@/types/category";

type ProductFiltersProps = {
  categories: Category[];
};

const sortOptions = [
  {
    value: "",
    label: "پیش‌فرض",
    description: "ترتیب پیشنهادی",
  },
  {
    value: "latest",
    label: "جدیدترین",
    description: "محصولات جدیدتر ابتدا",
  },
  {
    value: "price_asc",
    label: "ارزان‌ترین",
    description: "کمترین قیمت ابتدا",
  },
  {
    value: "price_desc",
    label: "گران‌ترین",
    description: "بیشترین قیمت ابتدا",
  },
  {
    value: "name",
    label: "بر اساس نام",
    description: "مرتب‌سازی الفبایی",
  },
];

function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    );
}

export default function ProductFilters({
  categories,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [category, setCategory] = useState(
    searchParams.get("category") ?? "",
  );

  const [minimumPrice, setMinimumPrice] = useState(
    searchParams.get("min_price") ?? "",
  );

  const [maximumPrice, setMaximumPrice] = useState(
    searchParams.get("max_price") ?? "",
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") ?? "",
  );

  const [discounted, setDiscounted] = useState(
    searchParams.get("discounted") === "true",
  );

  useEffect(() => {
    if (!isSortOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSortOpen]);

  const selectedSort = useMemo(() => {
    return (
      sortOptions.find((item) => item.value === sort) ??
      sortOptions[0]
    );
  }, [sort]);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (category) count += 1;
    if (minimumPrice) count += 1;
    if (maximumPrice) count += 1;
    if (sort) count += 1;
    if (discounted) count += 1;

    return count;
  }, [
    category,
    minimumPrice,
    maximumPrice,
    sort,
    discounted,
  ]);

  const updateUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (minimumPrice) {
      params.set("min_price", minimumPrice);
    } else {
      params.delete("min_price");
    }

    if (maximumPrice) {
      params.set("max_price", maximumPrice);
    } else {
      params.delete("max_price");
    }

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    if (discounted) {
      params.set("discounted", "true");
    } else {
      params.delete("discounted");
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);

    setIsMobileOpen(false);
    setIsSortOpen(false);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("min_price");
    params.delete("max_price");
    params.delete("minimum_price");
    params.delete("maximum_price");
    params.delete("sort");
    params.delete("discounted");
    params.delete("page");

    setCategory("");
    setMinimumPrice("");
    setMaximumPrice("");
    setSort("");
    setDiscounted(false);
    setIsMobileOpen(false);
    setIsSortOpen(false);

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handlePriceChange = (
    value: string,
    type: "minimum" | "maximum",
  ) => {
    const cleanValue = toEnglishDigits(value).replace(/\D/g, "");

    if (type === "minimum") {
      setMinimumPrice(cleanValue);
    } else {
      setMaximumPrice(cleanValue);
    }
  };

  const SortDropdown = ({
    mobile = false,
  }: {
    mobile?: boolean;
  } = {}) => {
    return (
      <div className="relative w-full">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isSortOpen}
          onClick={() => setIsSortOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between gap-3 text-right transition-all duration-200 ${
            mobile
              ? "h-11 rounded-2xl border border-[#E2E8F0] bg-white px-3"
              : `h-[58px] rounded-2xl border bg-white px-3 ${
                  isSortOpen
                    ? "border-[#256D9B] ring-4 ring-[#256D9B]/10"
                    : "border-[#E2E8F0] hover:border-[#C8BFB6]"
                }`
          }`}
        >
          <div className="min-w-0 text-right">
            <p
              className={`truncate font-bold text-[#1E293B] ${
                mobile ? "text-[11px]" : "text-xs"
              }`}
            >
              {selectedSort.label}
            </p>

            {!mobile && (
              <p className="mt-1 truncate text-[9px] text-[#94A3B8]">
                {selectedSort.description}
              </p>
            )}
          </div>

          <ChevronDown
            size={mobile ? 14 : 17}
            className={`shrink-0 text-[#64748B] transition-transform duration-200 ${
              isSortOpen ? "rotate-180 text-[#256D9B]" : ""
            }`}
          />
        </button>

        {isSortOpen && (
          <button
            type="button"
            aria-label="بستن مرتب‌سازی"
            onClick={() => setIsSortOpen(false)}
            className="fixed inset-0 z-[40] cursor-default"
          />
        )}

        {isSortOpen && (
          <div
            role="listbox"
            className={`absolute right-0 z-[50] w-full overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)] ${
              mobile
                ? "top-[calc(100%+7px)]"
                : "top-[calc(100%+8px)]"
            }`}
          >
            <div className="mb-1 px-2.5 pb-2 pt-1">
              <p className="text-[9px] font-bold text-[#94A3B8]">
                مرتب‌سازی محصولات
              </p>
            </div>

            <div className="space-y-1">
              {sortOptions.map((option) => {
                const active = sort === option.value;

                return (
                  <button
                    key={option.value || "default"}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setSort(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-right transition-all duration-150 ${
                      active
                        ? "bg-[#EAF4FA]"
                        : "text-[#334155] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-[11px] font-bold ${
                          active
                            ? "text-[#256D9B]"
                            : "text-[#334155]"
                        }`}
                      >
                        {option.label}
                      </p>

                      <p
                        className={`mt-1 text-[9px] ${
                          active
                            ? "text-[#C96A12]"
                            : "text-[#94A3B8]"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>

                    {active && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#256D9B] text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const FilterContent = ({
    mobile = false,
  }: {
    mobile?: boolean;
  } = {}) => {
    return (
      <div className={mobile ? "space-y-5" : "space-y-0"}>
        {/* Category */}
        <section
          className={
            mobile
              ? ""
              : "border-b border-[#E7E1DA] py-5 first:pt-0"
          }
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-black text-[#292825]">
              دسته‌بندی
            </p>

            {category && (
              <button
                type="button"
                onClick={() => setCategory("")}
                className="text-[10px] font-bold text-[#A29C96] transition-colors hover:text-[#256D9B]"
              >
                حذف
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleCategoryChange("")}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right transition-all duration-150 ${
                !category
                  ? "bg-[#EAF4FA]"
                  : "hover:bg-[#FAF8F5]"
              }`}
            >
              <span
                className={`text-[11px] font-bold ${
                  !category
                    ? "text-[#256D9B]"
                    : "text-[#595550]"
                }`}
              >
                همه محصولات
              </span>

              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                  !category
                    ? "border-[#256D9B] bg-[#256D9B] text-white"
                    : "border-[#DCD6CF] bg-white text-transparent group-hover:border-[#BDB5AC]"
                }`}
              >
                <Check size={11} strokeWidth={3} />
              </span>
            </button>

            {categories.map((item) => {
              const itemSlug = item.slug;
              const isActive = category === itemSlug;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(
                      isActive ? "" : itemSlug,
                    )
                  }
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right transition-all duration-150 ${
                    isActive
                      ? "bg-[#EAF4FA]"
                      : "hover:bg-[#FAF8F5]"
                  }`}
                >
                  <span
                    className={`text-[11px] font-bold ${
                      isActive
                        ? "text-[#256D9B]"
                        : "text-[#595550]"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                      isActive
                        ? "border-[#256D9B] bg-[#256D9B] text-white"
                        : "border-[#DCD6CF] bg-white text-transparent group-hover:border-[#BDB5AC]"
                    }`}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Price */}
        <section
          className={
            mobile
              ? ""
              : "border-b border-[#E7E1DA] py-5"
          }
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-black text-[#292825]">
              محدوده قیمت
            </p>

            {(minimumPrice || maximumPrice) && (
              <button
                type="button"
                onClick={() => {
                  setMinimumPrice("");
                  setMaximumPrice("");
                }}
                className="text-[10px] font-bold text-[#A29C96] transition-colors hover:text-[#256D9B]"
              >
                حذف
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                dir="ltr"
                value={minimumPrice}
                onChange={(event) =>
                  handlePriceChange(
                    event.target.value,
                    "minimum",
                  )
                }
                onWheel={(event) =>
                  event.currentTarget.blur()
                }
                placeholder="حداقل"
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 pr-3 text-right text-[11px] font-bold text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#256D9B] focus:bg-white focus:ring-4 focus:ring-[#256D9B]/10"
              />

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-[#A29C96]">
                تومان
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                dir="ltr"
                value={maximumPrice}
                onChange={(event) =>
                  handlePriceChange(
                    event.target.value,
                    "maximum",
                  )
                }
                onWheel={(event) =>
                  event.currentTarget.blur()
                }
                placeholder="حداکثر"
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 pr-3 text-right text-[11px] font-bold text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#256D9B] focus:bg-white focus:ring-4 focus:ring-[#256D9B]/10"
              />

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-[#A29C96]">
                تومان
              </span>
            </div>
          </div>
        </section>

      
        {!mobile && (
          <section className="border-b border-[#E7E1DA] py-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-black text-[#292825]">
                مرتب‌سازی
              </p>

              <span className="text-[10px] text-[#A29C96]">
                {selectedSort.label}
              </span>
            </div>

            {SortDropdown()}
          </section>
        )}

       
        <section
          className={
            mobile
              ? ""
              : "border-b border-[#E7E1DA] py-5"
          }
        >
          <button
            type="button"
            onClick={() =>
              setDiscounted((prev) => !prev)
            }
            className="flex w-full items-center justify-between"
            aria-pressed={discounted}
          >
            <div className="text-right">
              <p className="text-xs font-black text-[#292825]">
                فقط محصولات تخفیف‌دار
              </p>

              <p className="mt-1 text-[9px] text-[#A29C96]">
                نمایش محصولات دارای تخفیف
              </p>
            </div>

            <span
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                discounted
                  ? "bg-[#F28C28]"
                  : "bg-[#D8D3CD]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                  discounted
                    ? "right-1"
                    : "right-6"
                }`}
              />
            </span>
          </button>
        </section>
      </div>
    );
  };

  return (
    <div className="w-full lg:w-[280px] lg:shrink-0">
      {/* Desktop */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
        <div className="overflow-visible rounded-[26px] border border-[#E7E1DA] bg-white p-5 shadow-[0_12px_40px_rgba(45,40,35,0.07)]">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4FA] text-[#256D9B]">
                <Filter size={17} />
              </span>

              <div>
                <h2 className="text-sm font-black text-[#292825]">
                  فیلتر محصولات
                </h2>

                {activeFilterCount > 0 && (
                  <p className="mt-0.5 text-[9px] text-[#A29C96]">
                    {activeFilterCount} فیلتر فعال
                  </p>
                )}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg px-2 py-1 text-[9px] font-bold text-[#A29C96] transition-colors hover:bg-[#FAF8F5] hover:text-[#256D9B]"
              >
                پاک کردن
              </button>
            )}
          </div>

          {FilterContent()}

          <button
            type="button"
            onClick={updateUrl}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#256D9B] text-xs font-black text-white shadow-[0_8px_20px_rgba(37,109,155,0.18)] transition-all duration-200 hover:bg-[#1E557B] hover:shadow-[0_10px_24px_rgba(37,109,155,0.24)] active:scale-[0.98]"
          >
            نمایش محصولات

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/15 px-1.5 text-[9px]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </aside>


      <div className="lg:hidden">
        <div className="flex items-center gap-2 rounded-2xl border border-[#E7E1DA] bg-white p-2 shadow-[0_8px_25px_rgba(45,40,35,0.06)]">
          <button
            type="button"
            onClick={() => {
              setIsSortOpen(false);
              setIsMobileOpen(true);
            }}
            className="relative flex h-11 shrink-0 items-center gap-2 rounded-2xl bg-[#EAF4FA] px-3 text-[11px] font-black text-[#256D9B]"
          >
            <Filter size={15} />

            <span>فیلتر</span>

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#256D9B] px-1 text-[9px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="min-w-0 flex-1">
            {SortDropdown({ mobile: true })}
          </div>

          <button
            type="button"
            onClick={updateUrl}
            className="flex h-11 shrink-0 items-center justify-center rounded-2xl bg-[#256D9B] px-3 text-[10px] font-black text-white transition-colors hover:bg-[#1E557B]"
          >
            اعمال
          </button>
        </div>
      </div>

     
      {isMobileOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          <button
            type="button"
            aria-label="بستن فیلترها"
            onClick={() => {
              setIsMobileOpen(false);
              setIsSortOpen(false);
            }}
            className="absolute inset-0 bg-[#292825]/35 backdrop-blur-[2px]"
          />

          <div className="fixed inset-y-0 right-0 flex h-[100dvh] w-[88%] max-w-[380px] flex-col bg-[#FBFAF8] shadow-[-20px_0_60px_rgba(45,40,35,0.18)]">
          
            <div className="flex shrink-0 items-center justify-between border-b border-[#E7E1DA] bg-white px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4FA] text-[#256D9B]">
                  <Filter size={17} />
                </span>

                <div>
                  <h2 className="text-sm font-black text-[#292825]">
                    فیلتر محصولات
                  </h2>

                  {activeFilterCount > 0 && (
                    <p className="mt-0.5 text-[9px] text-[#A29C96]">
                      {activeFilterCount} فیلتر فعال
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsSortOpen(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F1ED] text-[#77716A] transition-colors hover:bg-[#EDE9E4] hover:text-[#292825]"
                aria-label="بستن فیلترها"
              >
                <X size={17} />
              </button>
            </div>

          
            <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-5 py-5">
              {FilterContent({ mobile: true })}
            </div>

          
            <div className="shrink-0 border-t border-[#E7E1DA] bg-white p-4">
              <div className="flex gap-2">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex h-12 shrink-0 items-center justify-center rounded-2xl border border-[#E7E1DA] bg-white px-4 text-[10px] font-black text-[#77716A] transition-colors hover:bg-[#FAF8F5]"
                  >
                    پاک کردن
                  </button>
                )}

                <button
                  type="button"
                  onClick={updateUrl}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#256D9B] text-xs font-black text-white shadow-[0_8px_20px_rgba(37,109,155,0.18)] transition-all hover:bg-[#1E557B] active:scale-[0.98]"
                >
                  نمایش محصولات

                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/15 px-1.5 text-[9px]">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}