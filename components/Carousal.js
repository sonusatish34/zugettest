"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

function DeliveryBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#793FDF]/10 backdrop-blur-md border border-[#793FDF]/20 text-[#793FDF] text-[10px] font-bold tracking-widest uppercase rounded-md px-2.5 py-1 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#793FDF] animate-pulse inline-block" />
      30 min
    </span>
  );
}

function StoreCard({ store }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl w-[200px] sm:w-[240px] md:w-[260px] h-[280px] sm:h-[320px] bg-slate-200 border border-slate-200 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Background Image */}
      <div className="absolute inset-0">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}
        <img
          src={store.store_image_duplicate}
          alt={store.store_name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Dark gradient at the bottom so white text remains readable over any image */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

      {/* Top Badge */}
      <div className="absolute top-3 left-3 z-10">
        <DeliveryBadge />
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-bold text-white text-lg md:text-xl leading-tight capitalize truncate">
          {store.store_name}
        </h3>
        
        {store.area_name && (
          <div className="flex items-center gap-1.5 mt-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#793FDF">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span className="text-slate-300 text-xs font-medium capitalize truncate">
              {store.area_name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StoreCarousel() {
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── Fetch stores ── */
  useEffect(() => {
    async function getStores() {
      try {
        const res = await fetch("https://dev.zuget.com/site/stores", {
          headers: { accept: "application/json" },
        });
        const data = await res.json();
        setStoreList(data?.results || []);
      } catch (error) {
        console.error("Failed to fetch stores", error);
        setStoreList([]);
      } finally {
        setLoading(false);
      }
    }
    getStores();
  }, []);

  /* ── Skeleton card for loading state ── */
  const SkeletonCard = () => (
    <div className="rounded-2xl w-[200px] sm:w-[240px] md:w-[260px] h-[280px] sm:h-[320px] bg-slate-200 animate-pulse border border-slate-100" />
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        .zu-sc * { font-family: 'DM Sans', sans-serif; }
        .zu-sc h2 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        
        /* Swiper specific overrides for smooth free-scroll */
        .swiper-slide {
          width: auto !important;
        }
      `}</style>

      <section className="zu-sc relative bg-slate-50 overflow-hidden py-16 md:py-24">
        
        {/* Trendy Light Background Elements */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
          style={{ 
            backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#793FDF]/5 blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#793FDF]/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Header Section (Matches Screenshot) */}
          <div className="mb-10">
            <p className="text-[#793FDF] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              Partner Stores
            </p>
            <h2 className="text-5xl md:text-7xl text-slate-900 leading-none">
              Shop the<br />
              <span className="text-[#793FDF]">City's Best.</span>
            </h2>
          </div>

          {/* Stores Slider Title */}
          <div className="mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              More Stores ({loading ? "..." : storeList.length})
            </h3>
          </div>

          {/* Swiper Carousel */}
          <div className="relative -mx-5 px-5 sm:mx-0 sm:px-0">
            <Swiper
              modules={[FreeMode]}
              freeMode={true}
              grabCursor={true}
              spaceBetween={16}
              slidesPerView="auto"
              className="w-full pb-8"
            >
              {loading
                ? Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <SwiperSlide key={`skeleton-${i}`}>
                        <SkeletonCard />
                      </SwiperSlide>
                    ))
                : storeList.map((store) => (
                    <SwiperSlide key={store.id}>
                      <StoreCard store={store} />
                    </SwiperSlide>
                  ))}
            </Swiper>

            {/* Empty State */}
            {!loading && storeList.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm font-medium">No stores available right now.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}