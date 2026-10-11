import Link from "next/link";

import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="mt-10 w-full  bg-[#405A64] text-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">

          <div>
            <div className="flex items-center gap-2">
              <span className="h-7 w-1.5 rounded-full bg-[#C9825B]" />

              <h2 className="text-xl font-extrabold tracking-tight">
                Nell clayArt
              </h2>
            </div>

            <p className="mt-4 max-w-sm text-xs leading-7 text-[#D9E6EB] sm:text-sm">
              محصولات دست‌ساز و خاص، ساخته‌شده با عشق برای زیبایی بیشتر
              لحظه‌های روزمره شما.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام Nell clayArt"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#D9E6EB] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8FB8C7] hover:text-white">
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام Nell clayArt"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#D9E6EB] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6F9EAF] hover:text-white ">
                <FaTelegramPlane size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold sm:text-base">
              دسترسی سریع
            </h3>

            <div className="mt-2 h-0.5 w-7 rounded-full bg-[#C9825B]" />

            <ul className="mt-5 space-y-3 text-xs text-[#D9E6EB] sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-white"
                >
                  صفحه اصلی
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="transition-colors duration-300 hover:text-white"
                >
                  محصولات
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-300 hover:text-white"
                >
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold sm:text-base">
              دسته‌بندی محصولات
            </h3>

            <div className="mt-2 h-0.5 w-7 rounded-full bg-[#C9825B]" />

            <ul className="mt-5 space-y-3 text-xs text-[#D9E6EB] sm:text-sm">
              <li>
                <Link
                  href="/products?category=glasses_holder"
                  className="transition-colors duration-300 hover:text-white"
                >
                  هولدر عینک
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=bag_charm"
                  className="transition-colors duration-300 hover:text-white"
                >
                   آویز کیف
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=phone_design"
                  className="transition-colors duration-300 hover:text-white"
                >
                  تزئینی قاب گوشی
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=key"
                  className="transition-colors duration-300 hover:text-white"
                >
                  جاکلیدی
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold sm:text-base">
              ارتباط با ما
            </h3>

            <div className="mt-2 h-0.5 w-7 rounded-full bg-[#8FB8C7]" />

            <div className="mt-5 space-y-4 text-xs text-[#D9E6EB] sm:text-sm">

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#8FB8C7]"
                  strokeWidth={1.8}
                />

                <span>ایران ، همدان</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-[#8FB8C7]"
                  strokeWidth={1.8}
                />

                <span dir="ltr">۰۹۱۲ ۱۲۳ ۴۵۶۷</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-[#8FB8C7]"
                  strokeWidth={1.8}
                />

                <span dir="ltr">info@nellclayart.com</span>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-[10px] text-[#BFD0D5] sm:text-xs">
            © {new Date().getFullYear()} Nell clayArt — تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}