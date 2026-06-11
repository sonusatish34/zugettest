"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

import { 
  CloudUpload, 
  Store, 
  Bike, 
  LayoutDashboard, 
  Wallet, 
  TrendingUp 
} from "lucide-react";

const FashionMarquee = () => {
  const features = [
    { text: "Easy Catalog Upload", icon: CloudUpload },
    { text: "Local Customer Orders", icon: Store },
    { text: "Delivery Partner Support", icon: Bike },
    { text: "Order & Store Management", icon: LayoutDashboard },
    { text: "Transparent Payouts", icon: Wallet },
    { text: "Grow Locally", icon: TrendingUp },
  ];

  const MarqueeItem = ({ Icon, text }) => (
    <div className="flex items-center gap-3 mx-8">
      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
        <Icon size={28} />
      </div>
      <span>{text}</span>
    </div>
  );

  return (
    // Added shrink-0 so it never gets squished by the flex layout
    <div className="w-full h-[10%] min-h-[80px] shrink-0 flex items-center overflow-hidden border-y border-slate-200 bg-white/90 z-20">
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap text-lg md:text-xl lg:text-2xl font-semibold text-black items-center"
      >
        <div className="flex items-center">
          {features.map((feature, index) => (
            <MarqueeItem 
              key={`set1-${index}`} 
              Icon={feature.icon} 
              text={feature.text} 
            />
          ))}
        </div>
        
        <div className="flex items-center">
          {features.map((feature, index) => (
            <MarqueeItem 
              key={`set2-${index}`} 
              Icon={feature.icon} 
              text={feature.text} 
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const HeaderOverlay = ({ locname = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="w-full h-[100dvh] flex flex-col overflow-hidden bg-slate-50 font-sans">
      
      {/* TOP SECTION: IMAGE + NAV */}
      {/* Changed to flex-1 to safely fill remaining space without causing overflow */}
      <div className="relative w-full flex-1 z-0">
        
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src="/WhatsApp Image 2026-06-08 at 12.39.40 PM.jpeg"
            alt="Web Page Banner Backdrop"
            fill
            priority
            // Changed from object-contain to object-cover to remove the gap
            className="object-cover object-center lg:object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
        </div>

        <header 
          className={`fixed top-0 left-0 right-0 z-40 px-5 md:px-12 lg:px-20 flex justify-between items-center transition-all duration-400 ease-in-out ${
            "py-3 md:py-4 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-slate-200 -translate-y-0" 
          }`}
        >
          
          <div className="flex items-center gap-3 cursor-pointer select-none group">
            <div className="flex flex-col leading-tight">
              <span className={`text-[10px] font-extrabold tracking-widest uppercase transition-colors ${scrolled ? "text-[#793FDF]" : "text-[#793FDF]/90"}`}>
                30 Min Delivery
              </span>
              <span className={`flex items-center gap-1 text-sm font-bold transition-colors text-black hover:text-slate-200`}>
                Hyderabad <IoIosArrowDown className="text-black animate-pulse" size={16} />
              </span>
            </div>
          </div>

          <Link href="/" className="tracking-wide text-2xl md:text-3xl font-black tracking-tighter drop-shadow-sm transition-all active:scale-95 text-black">
            Zu<span className="text-[#793FDF]">Get</span>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex gap-x-10 font-bold text-sm tracking-wide transition-colors text-black">
              {['Home', 'Shops', 'Contact Us', 'About Us'].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="relative py-1 transition-all duration-300 hover:text-[#793FDF] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#793FDF] hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:hidden block z-50">
            <button
              ref={buttonRef}
              className="relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 rotate-45 translate-y-1.5" : scrolled ? "bg-slate-900 -translate-y-1" : "bg-white -translate-y-1 group-hover:bg-[#793FDF]"}`} />
              <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"} ${scrolled ? "bg-slate-900" : "bg-white group-hover:bg-[#793FDF]"}`} />
              <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 -rotate-45 -translate-y-1.5" : scrolled ? "bg-slate-900 translate-y-1" : "bg-white translate-y-1 group-hover:bg-[#793FDF]"}`} />
            </button>
          </div>

          <nav
            ref={menuRef}
            aria-label="Mobile Navigation"
            className={`
              fixed top-0 right-0 lg:h-screen w-[75%] sm:w-[50%]
              bg-white/95 backdrop-blur-xl border-l border-slate-100
              shadow-[-10px_0_40px_rgba(0,0,0,0.1)]
              transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="p-8 pt-28 flex flex-col gap-6 text-xl font-bold text-slate-800">
              {['Home', 'Shops', 'About Us', 'Contact Us'].map((item, idx) => (
                <Link 
                  key={idx}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                  className="hover:text-[#793FDF] hover:translate-x-2 transition-all duration-200 border-b border-slate-100 pb-4" 
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
            
            <div className="absolute bottom-10 left-8 right-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Partner with us</span>
                <span className="text-sm font-bold text-[#793FDF]">0% Commission</span>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* BOTTOM SECTION: MARQUEE */}
      <FashionMarquee />
      
    </div>
  );
};

export default HeaderOverlay;