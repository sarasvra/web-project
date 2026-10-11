import Link from "next/link";
import {
  ArrowLeft,
  Palette,
  Sparkles,
  Hand,
  PackageCheck,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main dir="rtl" className="min-h-screen bg-[#FBF9FF]">
        <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F3E8FF] px-4 py-2 text-xs font-bold text-[#7C3AED]">
                <Sparkles size={15} />
                درباره Nell clayArt
              </div>

              <h1 className="text-3xl font-black leading-[1.8] text-[#292332] sm:text-4xl lg:text-5xl">
                جایی برای
                <span className="text-[#DB2777]"> هنر، خلاقیت </span>
                و دست‌سازه‌های خاص
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-8 text-[#77717F] sm:text-base">
                در Nell clayArt تلاش می‌کنیم محصولاتی متفاوت و دوست‌داشتنی
                خلق کنیم؛ محصولاتی که زیبایی، خلاقیت و حس دست‌ساز بودن را
                در کنار هم داشته باشند.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-[#FBCFE8] opacity-60 blur-2xl" />
              <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-[#FED7AA] opacity-60 blur-2xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-[#EEE8F5] bg-white p-3 shadow-[0_15px_50px_rgba(91,33,182,0.08)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[25px] bg-[#F3E8FF]">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <Palette
                        size={55}
                        strokeWidth={1.4}
                        className="mx-auto text-[#7C3AED]"
                      />
                      <p className="mt-4 text-sm font-bold text-[#7C3AED]">
                        Nell clayArt
                      </p>
                      <p className="mt-2 text-xs text-[#8A7A9B]">
                        ساخته شده با عشق و خلاقیت
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="border-y border-[#EEE8F5] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <span className="text-xs font-extrabold text-[#DB2777]">
                داستان ما
              </span>

              <h2 className="mt-3 text-2xl font-black text-[#292332] sm:text-3xl">
                از یک علاقه ساده تا Nell clayArt
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-8 text-[#77717F]">
              <p>
                Nell clayArt با علاقه به هنرهای دست‌ساز و خلق چیزهایی شکل گرفت
                که بتوانند حس متفاوتی را به زندگی روزمره اضافه کنند.
              </p>

              <p>
                برای ما هر محصول فقط یک کالا نیست. پشت هر طراحی، انتخاب و
                ساخت، زمانی برای فکر کردن به جزئیات و ایجاد یک محصول خاص وجود
                دارد.
              </p>

              <p>
                هدف ما این است که مجموعه‌ای از محصولات زیبا، کاربردی و متفاوت
                را در اختیار شما قرار دهیم؛ محصولاتی که بتوانید با آن‌ها
                ارتباط برقرار کنید و از داشتنشان لذت ببرید.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-extrabold text-[#7C3AED]">
                ارزش‌های ما
              </span>

              <h2 className="mt-3 text-2xl font-black text-[#292332] sm:text-3xl">
                چیزهایی که برای ما اهمیت دارند
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#77717F]">
                هر محصولی که در Nell clayArt می‌بینید، بخشی از این ارزش‌ها را
                با خودش همراه دارد.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <ValueCard
                icon={<Hand size={21} />}
                title="دست‌ساز بودن"
                text="توجه به جزئیات و حس خاص محصولات دست‌ساز."
                className="bg-[#F3E8FF] text-[#7C3AED]"
              />

              <ValueCard
                icon={<Palette size={21} />}
                title="خلاقیت"
                text="تلاش برای خلق طرح‌ها و محصولات متفاوت."
                className="bg-[#FCE7F3] text-[#DB2777]"
              />

              <ValueCard
                icon={<Sparkles size={21} />}
                title="توجه به جزئیات"
                text="جزئیات کوچک می‌توانند تفاوت بزرگی ایجاد کنند."
                className="bg-[#FFF7ED] text-[#F97316]"
              />

              <ValueCard
                icon={<PackageCheck size={21} />}
                title="بسته‌بندی با دقت"
                text="محصول باید با همان دقتی که ساخته شده، آماده ارسال شود."
                className="bg-[#EFF6FF] text-[#2563EB]"
              />
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-gradient-to-l from-[#7C3AED] via-[#DB2777] to-[#F97316] px-6 py-12 text-center text-white sm:px-10">

            <h2 className="mt-5 text-2xl font-black sm:text-3xl">
              آماده‌ای محصولات Nell clayArt را ببینی؟
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85">
              مجموعه محصولات ما را ببین و محصول مورد علاقه‌ات را پیدا کن.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-[#7C3AED] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              رفتن به فروشگاه
              <ArrowLeft size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ValueCard({
  icon,
  title,
  text,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  className: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#EEE8F5] bg-white p-5 shadow-[0_8px_30px_rgba(48,48,48,0.04)]">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${className}`}>
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-black text-[#292332]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-7 text-[#77717F]">
        {text}
      </p>
    </div>
  );
}

