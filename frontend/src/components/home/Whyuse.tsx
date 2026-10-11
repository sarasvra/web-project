"use client";

import {
  Heart,
  PackageCheck,
  Sparkles,
  Hand,
} from "lucide-react";

const features = [
  {
    title: "کاملاً دست‌ساز",
    description: "هر قطعه با دست و با دقت ساخته می‌شود.",
    icon: Hand,
  },
  {
    title: "طراحی خاص",
    description: "طراحی‌هایی متفاوت برای انتخابی خاص.",
    icon: Sparkles,
  },
  {
    title: "بسته‌بندی با دقت",
    description: "هر سفارش با توجه به جزئیات آماده می‌شود.",
    icon: PackageCheck,
  },
  {
    title: "ساخته‌شده با عشق",
    description: "جزئیات کوچک، با عشق و حوصله ساخته می‌شوند.",
    icon: Heart,
  },
];

export default function WhyUsSection() {
  return (
     <section dir="rtl" className="pt-30 pb-20 px-5 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">


        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-6 w-1.5 rounded-full bg-[#C9825B]" />

            <h2 className="text-lg font-extrabold text-[#303030] sm:text-xl">
              چرا Nell clayArt؟
            </h2>
          </div>

          <p className="mt-2 text-[11px] text-[#777777] sm:text-xs">
            جزئیاتی که محصولات ما را خاص‌تر می‌کنند
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex min-h-[155px] flex-col items-center justify-center rounded-[26px] border border-[#E5E2DF] bg-white px-3 py-5 text-center shadow-[0_5px_18px_rgba(48,48,48,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8FB8C7] hover:shadow-[0_12px_28px_rgba(91,124,141,0.09)] sm:min-h-[170px] sm:rounded-[30px] sm:px-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14
                    ${
                      index === 3
                        ? "bg-[#F0D8C9] text-[#C9825B] group-hover:bg-[#C9825B] group-hover:text-white"
                        : "bg-[#D9E6EB] text-[#6F9EAF] group-hover:bg-[#8FB8C7] group-hover:text-white"
                    } `}>
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                
                <h3 className="mt-3 text-xs font-extrabold text-[#303030] transition-colors duration-300 group-hover:text-[#C9825B] sm:text-sm">
                  {feature.title}
                </h3>

               
                <p className="mt-1.5 max-w-[190px] text-[10px] leading-5 text-[#777777] sm:text-[11px] sm:leading-6">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}