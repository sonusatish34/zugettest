"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// High-quality store and clothing imagery
const storeData = [
  {
    id: 1,
    title: "The Urban Boutique",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    text: "Discover the latest streetwear and urban fashion trends, delivered to your door in 30 minutes flat.",
  },
  {
    id: 2,
    title: "Premium Exclusives",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    text: "Explore exclusive premium collections and runway-inspired looks from top-tier brands.",
  },
  {
    id: 3,
    title: "Ethnic Elegance",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4c0e?w=800&q=80",
    text: "Beautiful traditional wear and fusion styles ready for your next big celebration.",
  },
  {
    id: 4,
    title: "Everyday Essentials",
    image: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80",
    text: "Your everyday casuals, smart formals, and trendy accessories just a tap away.",
  },
  {
    id: 5,
    title: "Luxe Accessories",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    text: "Complete your outfit with designer bags, sunglasses, and statement jewelry instantly.",
  },
  {
    id: 6,
    title: "Ethnic Elegance",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4c0e?w=800&q=80",
    text: "Beautiful traditional wear and fusion styles ready for your next big celebration.",
  },
  {
    id: 7,
    title: "Everyday Essentials",
    image: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80",
    text: "Your everyday casuals, smart formals, and trendy accessories just a tap away.",
  },
];

export default function StoreCarousel() {
  return (
    // Vibrant, deep background for the section
    <section className="relative bg-[#0d0408] text-white min-h-screen py-24 font-sans flex flex-col justify-center overflow-hidden">
      
      {/* Colorful Animated Aurora Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rose Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e8416a]/20 blur-[140px] rounded-full mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
        {/* Peach Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#ff8c69]/20 blur-[140px] rounded-full mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        {/* Violet/Blue Glow */}
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-indigo-500/20 blur-[140px] rounded-full mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      {/* Required Scoped CSS for Swiper Active States */}
      <style>{`
        .swiper-slide {
          width: auto !important;
          user-select: none;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        /* 3D Scale Effect for inactive slides */
        .swiper-slide:not(.swiper-slide-active) {
          transform: scale(0.92);
          opacity: 0.6;
        }
        
        /* Expand/Collapse Text based on active slide */
        .swiper-slide:not(.swiper-slide-active) .store-desc {
          max-height: 0px;
          opacity: 0;
          margin-top: 0px;
        }
        .swiper-slide-active .store-desc {
          max-height: 100px;
          opacity: 1;
          margin-top: 12px;
        }
        .store-desc {
          overflow: hidden;
          transition: max-height 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease-in, margin-top 0.4s ease;
        }

        /* Custom Pagination Styling */
        .slider-pagination__item {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: #ffffff;
          transition: all 0.3s ease-out;
          opacity: 0.25;
          cursor: pointer;
          display: inline-block;
        }
        .slider-pagination__item.active {
          width: 36px;
          opacity: 1;
          background: #e8416a; /* Zuget Rose */
          box-shadow: 0 0 15px rgba(232, 65, 106, 0.6);
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 px-6">
          <span className="text-[#ff8c69] font-bold text-xs tracking-[0.2em] uppercase mb-3 block">
            Partner Stores
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">
            Shop the City's Best.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto font-light">
            Browse top local boutiques and international brands available on Zuget for instant 30-minute delivery.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative md:px-[90px]">
          
          {/* Custom Navigation Arrows */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-10 flex justify-between items-center pointer-events-none hidden md:flex">
            <div className="slider-nav__item_prev w-14 h-14 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 text-white hover:text-[#ff8c69] hover:scale-110 ml-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="slider-nav__item_next w-14 h-14 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 text-white hover:text-[#ff8c69] hover:scale-110 mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Swiper Implementation */}
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView="auto"
            spaceBetween={24}
            speed={800}
            loop={true} // Infinite Loop
            centeredSlides={true}
            navigation={{
              prevEl: '.slider-nav__item_prev',
              nextEl: '.slider-nav__item_next',
            }}
            pagination={{
              el: '.slider-pagination',
              type: "bullets",
              clickable: true,
              bulletClass: "slider-pagination__item",
              bulletActiveClass: "active",
            }}
            breakpoints={{
              768: { spaceBetween: 40 }
            }}
            className="w-full !pb-10"
          >
            {storeData.map((slide) => (
              <SwiperSlide key={slide.id}>
                {/* Full Screen Image Card */}
                <div className="w-[calc(100vw-40px)] sm:w-[380px] md:w-[460px] h-[480px] md:h-[620px] rounded-[2.5rem] relative overflow-hidden shadow-2xl bg-[#1a0a00] border border-white/10 group cursor-grab active:cursor-grabbing">
                  
                  {/* Background Image */}
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* High-Contrast Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00] via-[#1a0a00]/40 to-transparent pointer-events-none opacity-90" />

                  {/* Text Content (Strictly 2 texts) */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end z-10">
                    
                    {/* Text 1: Always Visible */}
                    <h3 className="font-serif font-bold text-3xl md:text-4xl text-white tracking-wide drop-shadow-md leading-tight">
                      {slide.title}
                    </h3>
                    
                    {/* Text 2: Hides/Shows based on active state */}
                    <div className="store-desc text-white/70 font-light text-sm md:text-base leading-relaxed border-t border-white/10 pt-3">
                      {slide.text}
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Container */}
          <div className="slider-pagination flex items-center justify-center flex-wrap gap-2.5 mt-4" />

        </div>
      </div>
    </section>
  );
}