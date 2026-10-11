"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section dir="rtl" className="pt-30 px-5 sm:px-6">
      <div ref={sectionRef} className="mx-auto w-full max-w-7xl">
       
        <div className={` relative overflow-hidd rounded-[30px] border border-[#E5E2DF] bg-gradient-to-br from-[#E0FFFF] via-white to-[#E0FFFF] p-5 shadow-[0_8px_30px_rgba(48,48,48,0.05)] transition-all duration-700 sm:p-8 md:p-10 lg:p-12
                          ${ isVisible ? "translate-y-0 opacity-100": "translate-y-10 opacity-0" } `} >
        
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D9E6EB] opacity-70 blur-3xl"
          />

        
          <div
            className="absolute -bottom-24 -left-20 h-60 w-6 rounded-ful bg-[#F0D8C9] opacity-70 blur-3xl " />

          <div
            className="relative z-10 grid items-center gap-8 md:grid-cols-[45%_55%] md:gap-10 lg:grid-cols-[44%_56%] lg:gap-14"
          >
           
            <div className="order-1">
              <div className="relative mx-auto max-w-md">
                <div
                  className="relative z-10 overflow-hidden rounded-[26px] border-4 border-white bg-white shadow-[0_15px_40px_rgba(91,124,141,0.12)]">
                  <Image
                    src="/images/login.jpg"
                    alt="درباره Nell clayArt"
                    width={700}
                    height={800}
                    className="h-[280px] w-full object-cover transition-transform duration-700  hover:scale-[1.03] sm:h-[340px] md:h-[380px] lg:h-[420px]"/>
                </div>

               
                <div
                  className="absolute -right-4 -top-4 h-20 w-20 rounded-full border-[8px] border-[#8FB8C7] opacity-80 sm:h-24 sm:w-24"/>

               
                <div
                  className="absolute -bottom-3 -left-3 h-8 w-8 rounded-full bg-[#C9825B] shadow-md shadow-[#C9825B]/20" />
              </div>
            </div>

           
            <div className="order-2 text-center md:text-right">
             
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold text-[#6F9EAF] shadow-sm sm:text-xs">
                <Sparkles size={13} />
                درباره ما
              </span>

             
              <h2 className="mt-4 text-2xl font-extrabold leading-[1.7] tracking-tight text-[#303030] sm:text-3xl md:text-3xl lg:text-4xl">
                داستانی از عشق
                <br />
                به دست‌سازها
              </h2>

             
              <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#C9825B] md:mx-0"/>

              <p className="mt-5 text-xs leading-7 text-[#555555] sm:text-sm sm:leading-8 lg:text-base">
                Nell clayArt جایی برای ساختن چیزهای کوچک و دوست‌داشتنی است؛
                محصولاتی که با دقت و عشق ساخته می‌شوند تا بخشی از زیبایی
                روزمره شما باشند.
              </p>

              <p className="mt-3 text-xs leading-7 text-[#777777] sm:text-sm sm:leading-8">
                هر محصول دست‌ساز، داستان و حال‌وهوای خودش را دارد و ما تلاش
                می‌کنیم این حس خاص را به خانه و زندگی شما بیاوریم.
              </p>

             
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#6F9EAF] px-5 py-3 text-xs font-bold text-white shadow-[0_6px_18px_rgba(91,124,141,0.18)] transition-all duration-300 hover:-translate-x-1 hover:bg-[#5B7C8D] hover:shadow-[0_10px_25px_rgba(91,124,141,0.25)] sm:px-6 sm:text-sm">
                بیشتر درباره ما
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}