"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
// import "swiper/css/autoplay";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import TextReveal from "./TextReveal";


export default function Mens() {

    const images = [
        "/mens/mens1.png",
        "/mens/Group 1171278146 (1).png",
        "/mens/mens3.png",
        "/mens/mens4.png",
        "/mens/mens5.png"
    ];



    return (
        <div className="bg-white lg:py-16 min-h-80 relative">
            <div className="text-center mb-10">
                <p className="text-pink-500 text-xl lg:text-3xl font-bold">Mens</p>
                <TextReveal>
                    <h2 className="text-black text-sm lg:text-lg mt-1 max-w-5xl mx-auto">

                        Discover men’s clothing with a smart Try-On Feature. Instantly preview how shirts, tees, trousers, and ethnic wear look on you before stepping into the store. Style made simple and personal.
                    </h2>
                </TextReveal>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

                {/* Custom Prev Arrow */}
                <button
                    className="custommens-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 
                               bg-white text-black rounded-full w-10 h-10 flex items-center
                                cursor-pointer p-4 shadow-lg 
                               hover:bg-pink-400 hover:text-white transition"
                >
                    ❮
                </button>

                {/* Custom Next Arrow */}
                <button
                    className="custommens-next absolute right-0 top-1/2 -translate-y-1/2 z-10 
                               bg-white text-black rounded-full w-10 h-10 flex items-center
                                cursor-pointer p-4 shadow-lg 
                               hover:bg-pink-400 hover:text-white transition"
                >
                    ❯
                </button>

                <div className="w-full max-w-4xl mx-auto mt-10">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation={{
                            nextEl: ".custommens-next",
                            prevEl: ".custommens-prev",
                        }}
                        className="rounded-xl"
                        breakpoints={{
                            268: { slidesPerView: 1.6 },
                            1024: { slidesPerView: 4 },
                        }}
                        loop={true}

                    >


                        {images.map((src, idx) => (
                            <SwiperSlide>
                                <div className="flex items-center justify-center text-white text-2xl rounded-xl">
                                    <Image
                                        src={src}
                                        alt={`mens product`}
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
