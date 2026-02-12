"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/autoplay";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import TextReveal from "./TextReveal";



export default function Womens() {

    const images = [
        "/womens/wm1.png",
        "/womens/wm2.png",
        "/womens/wm3.png",
        "/womens/wm5.png",
        "/womens/wm4.png",

    ];



    return (
        <div className="bg-white lg:py-16 py-10 min-h-80 relative">
            <div className="text-center mb-10">
                <p className="text-[#793FDF] text-xl lg:text-3xl font-bold">Womens</p>
                <TextReveal>
                    <h2 className="text-black text-sm lg:text-lg mt-1 max-w-5xl mx-auto">

                        Explore stylish women’s clothing with our smart Try-On Feature. Instantly preview outfits, check the fit, and see which designs match your style before visiting the store. Fashion that feels personal, modern, and made for you.
                    </h2>
                </TextReveal>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

                {/* Custom Prev Arrow */}
                <button
                    className="customwom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 
                               bg-white text-black rounded-full w-10 h-10 flex items-center
                                cursor-pointer p-4 shadow-lg 
                               hover:bg-pink-400 hover:text-white transition"
                >
                    ❮
                </button>

                {/* Custom Next Arrow */}
                <button
                    className="customwom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 
                               bg-white text-black rounded-full w-10 h-10 flex items-center
                                cursor-pointer p-4 shadow-lg 
                               hover:bg-pink-400 hover:text-white transition"
                >
                    ❯
                </button>

                <div className="w-full max-w-4xl mx-auto mt-10">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={4}
                        pagination={{ clickable: true }}
                        navigation={{
                            nextEl: ".customwom-next",
                            prevEl: ".customwom-prev",
                        }}
                        className="rounded-xl"
                        breakpoints={{
                            268: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        autoplay={{
                            delay: 2000,          // time between slides (2.5s)
                            disableOnInteraction: true, // keep autoplay after manual swipe
                            pauseOnMouseEnter: true,     // pause on hover
                        }}
                        loop={true}

                    >
                        {images.map((src, idx) => (
                            <SwiperSlide>
                                <div className="flex items-center justify-center text-white text-2xl rounded-xl">
                                    <Image
                                        src={src}
                                        alt={`womens product`}
                                        width={150}
                                        height={150}
                                        className="object-contain rounded-xs"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
