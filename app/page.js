"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LoaderFLIP from "@/components/LoaderFLIP";
import Banner from "@/components/Banner";
import Collabrarors from "@/components/Collabrarors";
import Mens from "@/components/Mens";
import Womens from "@/components/Womens";
import TryOn from "@/components/TryOn";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import TopCategories from "@/components/TopCategories";
import OwnerBanner from "@/components/OwnerBanner";
import GameClothes from "@/components/GameClothes";
import FashionPhysicsBox from "@/components/FashionPhysicsBox";
import ElegantCarousel from "@/components/ElegantCarousel";
import Carousel from "@/components/Carousal";
import ShopByCat from "@/components/ShopByCat";

export default function Home() {
  const Header = dynamic(() => import('../components/Header'), {
    ssr: false, 
  });

  return (
    <>
      <main className="bg-white text-white">
        {/* <Header locname="bangalore" /> */}
        {/* <Banner /> */}
        <OwnerBanner />
         <Collabrarors />
         {/* <FashionPhysicsBox /> */}
        {/*<Mens />
        <Womens />
        <TryOn />
        {/* <HowItWorks /> */}
        {/* <GameClothes /> */}
        <TopCategories />
        {/* <ElegantCarousel /> */}
        <Carousel/>
        <ShopByCat/>
        <Footer />
      </main>
    </>
  );
}
