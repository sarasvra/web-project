"use client";

import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section dir="rtl" className="relative z-0 h-[500px] w-full overflow-hidden bg-[#F5F5F3] sm:h-[600px] md:h-[450px]"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={800}
        className="h-full w-full"
      >
        <SwiperSlide>
          <div className="relative h-full w-full overflow-hidden bg-[#D9D4D0]">
           <picture className="absolute inset-0 block h-full w-full">
            <source
                    media="(max-width: 767px)"
                   srcSet="/images/slide_1_mobile.jpg"
            />

              <img
                  src="/images/slide_1.jpg"
                 alt="محصولات دست‌ساز Nell clayArt"
                 className="absolute inset-0 h-full w-full object-cover"/>
            </picture>

            <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/20 to-black/5" />

           
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D9E6EB]/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />

           
            <div className="relative z-10 flex h-full items-center">
              <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16">
                <div className="max-w-xl text-right text-white">
                  <div
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-m0"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#D9E6EB]" />

                        هنر دست ، برای خونه تو
                  </div>

                  <h1
                    className="text-4xl font-extrabold leading-[1.35] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)] sm:text-5xl lg:text-6xl"
                  >
                    محصولات دست ساز
                    <br />

                    <span >
                         با عشق و علاقه
                    </span>
                  </h1>

                
                  <div className="mt-5 h-1 w-14 rounded-full bg-[#D9E6EB]" />

                 
                  <p
                    className="mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base sm:leading-8"
                  >
                    مجموعه‌ای از آثار دست‌ساز و خاص Nell clayArt؛
                    ساخته‌شده با عشق برای خانه‌هایی که جزئیات برایشان
                    اهمیت دارد.
                  </p>

                
                   <div className="mt-7 flex flex-wrap items-center gap-3">
                   
                 <a
                   href="#"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="اینستاگرام Nell clayArt"
                   className="group flex h-11 w-36 items-center justify-center gap-2 rounded-full bg-[#8FB8C7] text-xs font-bold text-white shadow-md shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6F9EAF] sm:h-12 sm:w-40 sm:text-sm">
                 <FaInstagram
                       size={17}
                      className="transition-transform duration-300 group-hover:scale-110"/>
                          اینستاگرام
                 </a>

               
               <a
                 href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام Nell clayArt"
               className="group flex h-11 w-36 items-center justify-center gap-2 rounded-full border border-white/50 bg-white/90 text-xs font-bold text-[#4B4144] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:h-12 sm:w-40 sm:text-sm">
                 <FaTelegramPlane
                       size={17}
                className="text-[#8FB8C7] transition-transform duration-300 group-hover:scale-110"/>
                       تلگرام
                      </a>
                   </div>
                </div>
              </div>
            </div>

           
            <div className="absolute bottom-6 left-6 z-10 sm:bottom-8 sm:left-10">
              <div className="rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[10px] font-semibold tracking-wide text-white shadow-lg  backdrop-blur-md sm:text-xs">
                Nell clayArt
              </div>
            </div>
          </div>
        </SwiperSlide>

        

        <SwiperSlide>
          <div className="relative h-full w-full overflow-hidden bg-[#EDEBE8]">
           <picture className="absolute inset-0 block h-full w-full">
             <source
                 media="(max-width: 767px)"
                 srcSet="/images/slide_2_mobile.jpg"/>

            <img
                  src="/images/slide_1.jpg"
                  alt="مجموعه محصولات Nell clayArt"
                 className="absolute inset-0 h-full w-full object-cover" />
           </picture>

          
            <div className=" absolute inset-0 bg-gradient-to-t from-black/50  via-black/10 to-white/5"/>

           
            
          
    <div className="absolute inset-0 flex items-center">
       <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="max-w-md text-right">

     
      <div className="mb-5 flex items-center justify-start gap-3">
        <span className="h-px w-10 bg-white/80" />
        <span className="h-2 w-2 rounded-full bg-[#D9E6EB]" />
      </div>

     
      <h2 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)] sm:text-5xl md:text-6xl" >
         Nell clayArt 
      </h2>

     
      <p className="mt-4 text-sm font-medium text-white/95 sm:text-base">
    
      </p>


      <Link href="/products" className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#8FB8C7] px-5 py-2.5 text-xs font-bold text-white shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-x-1 hover:bg-[#6F9EAF] hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] sm:px-6 sm:py-3 sm:text-sm ">
        دیدن محصولات

        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
      </Link>

      </div>
   </div>
 </div>
           
            <div className=" absolute bottom-5 right-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md sm:text-xs" >
              هنر دست، برای خانه تو
            </div>
          </div>
        </SwiperSlide>
      </Swiper>


      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="اسلاید قبلی"
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[#4B4144] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white sm:right-6 sm:h-11 sm:w-11">
        <ChevronRight size={20} strokeWidth={1.8} />
      </button>


      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="اسلاید بعدی"
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[#4B4144] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white sm:left-6 sm:h-11 sm:w-11">
        <ChevronLeft size={20} strokeWidth={1.8} />
      </button>
    </section>
  );
}