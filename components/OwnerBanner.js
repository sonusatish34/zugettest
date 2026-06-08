"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";

const HeaderOverlay = ({ locname = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle Scroll to change Navbar appearance
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

  // Lock body scroll when mobile menu is open
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

  // Close mobile menu on outside click
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
    <div className="relative w-full min-h-[264px] md:min-h-[750px] lg:min-h-[850px] flex flex-col overflow-hidden bg-slate-50 font-sans">
      
      {/* BACKGROUND BANNER IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/WhatsApp Image 2026-06-08 at 12.39.40 PM.jpeg"
          alt="Web Page Banner Backdrop"
          fill
          priority
          className="lg:object-cover object-contain lg:object-top object-bottom"
        />
        {/* Subtle gradient overlay to ensure top navbar text is readable before scrolling */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* FIXED NAVIGATION BAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 px-5 md:px-12 lg:px-20 flex justify-between items-center transition-all duration-400 ease-in-out ${
          "py-3 md:py-4 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-slate-200 -translate-y-0" 
            
        }`}
      >
        
        {/* Location Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="flex flex-col leading-tight">
            <span className={`text-[10px] font-extrabold tracking-widest uppercase transition-colors ${scrolled ? "text-[#793FDF]" : "text-[#793FDF]/90"}`}>
              30 Min Delivery
            </span>
            <span className={`flex items-center gap-1 text-sm font-bold transition-colors text-black hover:text-slate-200}`}>
              Hyderabad <IoIosArrowDown className={` "text-black"} animate-pulse`} size={16} />
            </span>
          </div>
        </div>

        {/* LOGO */}
        <Link href="/" className={`tracking-wide text-2xl md:text-3xl font-black tracking-tighter drop-shadow-sm transition-all active:scale-95 text-black`}>
          Zu<span className="text-[#793FDF]">Get</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block">
          <ul className={`flex gap-x-10 font-bold text-sm tracking-wide transition-colors text-black`}>
            {['Home', 'Shops', 'Contact Us', 'About Us'].map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className={`relative py-1 transition-all duration-300 hover:text-[#793FDF] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#793FDF] hover:after:w-full after:transition-all after:duration-300`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Menu Trigger Button (Animated CSS Icon) */}
        <div className="lg:hidden block z-50">
          <button
            ref={buttonRef}
            className="relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 rotate-45 translate-y-1.5" : scrolled ? "bg-slate-900 -translate-y-1" : "bg-w -translate-y-1 group-hover:bg-[#793FDF]"}`} />
            <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"} ${scrolled ? "bg-slate-900" : "bg-whi group-hover:bg-[#793FDF]"}`} />
            <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 -rotate-45 -translate-y-1.5" : scrolled ? "bg-slate-900 translate-y-1" : "bg-whit translate-y-1 group-hover:bg-[#793FDF]"}`} />
          </button>
        </div>

        {/* Mobile Sliding Navigation Drawer */}
        <nav
          ref={menuRef}
          aria-label="Mobile Navigation"
          className={`
            fixed top-0 right-0 h-screen w-[75%] sm:w-[50%]
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
          
          {/* Mobile Menu Footer Element */}
          <div className="absolute bottom-10 left-8 right-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Partner with us</span>
              <span className="text-sm font-bold text-[#793FDF]">0% Commission</span>
            </div>
          </div>
        </nav>
      </header>

      {/* DYNAMIC HERO BODY SEGMENT */}
      

    </div>
  );
};

export default HeaderOverlay;