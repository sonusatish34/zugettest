"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";

const HeaderOverlay = ({ locname = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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
    <div className="relative w-full min-h-[304px] md:min-h-[750px] lg:min-h-[850px] flex flex-col overflow-hidden bg-[#5F13E7]">
      
      {/* BACKGROUND BANNER IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/Web-Page.webp"
          alt="Web Page Banner Backdrop"
          fill
          priority
          className="lg:object-cover object-contain lg:object-top object-bottom transform scale-"
        />
      </div>

      {/* FIXED GLASS NAVIGATION BAR CONTAINER */}
      <header className="relative z-30 px-6 md:px-16 lg:px-24 py-5 flex justify-between items-center bg-black/5 backdrop-blur-xs border-b border-white/5 shadow-xs">
        
        {/* Location Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <div className="flex flex-col leading-tight">
            <span className="text-pink-300 text-[10px] font-extrabold tracking-widest uppercase">30 Min Delivery</span>
            <span className="flex items-center gap-1 text-sm font-bold text-white hover:text-pink-200 transition-colors">
              Hyderabad <IoIosArrowDown className="text-pink-400 animate-pulse" size={16} />
            </span>
          </div>
        </div>

        {/* LOGO */}
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-md transition-transform active:scale-95">
          Zu<span className="text-yellow-400">Get</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-10 text-white font-bold text-sm tracking-wide">
            <li><Link className="relative py-1 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 hover:after:w-full after:transition-all" href="/">Home</Link></li>
            <li><Link className="relative py-1 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 hover:after:w-full after:transition-all" href="/shops">Shops</Link></li>
            <li><Link className="relative py-1 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 hover:after:w-full after:transition-all" href="/contact-us">Contact Us</Link></li>
            <li><Link className="relative py-1 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 hover:after:w-full after:transition-all" href="/about-us">About Us</Link></li>
          </ul>
        </nav>

        {/* Mobile Hamburger Menu Trigger Button */}
        <div className="lg:hidden block">
          <button
            ref={buttonRef}
            className="z-40 text-white focus:outline-hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {!isOpen ? (
              <svg className="w-6 h-6 fill-current hover:text-yellow-400 transition-colors" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 fill-current text-purple-900" viewBox="0 0 24 24">
                <path d="M18.707 5.293a1 1 0 0 0-1.414 0L12 9.586 6.707 4.293a1 1 0 1 0-1.414 1.414L10.586 11l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 12.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 11l5.293-5.293a1 1 0 0 0 0-1.414z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Sliding Navigation Drawer */}
        <nav
          ref={menuRef}
          aria-label="Mobile Navigation"
          className={`
            fixed top-0 right-0 z-50
            h-screen w-[75%] sm:w-[60%]
            bg-white/90 backdrop-blur-2xl
            border-l border-white/20
            shadow-[0_0_50px_rgba(0,0,0,0.3)]
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="p-8 pt-24 flex flex-col gap-6 text-xl font-bold text-purple-950">
            <Link href="/" className="hover:text-purple-600 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/shops" className="hover:text-purple-600 transition-colors" onClick={() => setIsOpen(false)}>Shops</Link>
            <Link href="/about-us" className="hover:text-purple-600 transition-colors" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link href="/contact-us" className="hover:text-purple-600 transition-colors" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </div>
        </nav>
      </header>

      {/* DYNAMIC HERO BODY SEGMENT (Shares the background asset space) */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-16 lg:px-24 py-12 lg:py-0">
        
        {/* Left Columns - Text copy & CTA */}
        {/* <div className="lg:col-span-7 flex flex-col space-y-6 text-left max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none tracking-tight drop-shadow-xs">
            0% Commission <br className="hidden sm:inline"/>
            <span className="text-yellow-400 drop-shadow-md">Construct</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl font-medium text-purple-100/90 leading-relaxed max-w-xl">
            Empowering Local Shop Owners Through India's Premier Fast B2C Digital Commerce Platform.
          </p>

          <div className="pt-4">
            <button className="px-10 py-4 bg-white text-purple-900 font-extrabold text-sm tracking-wider uppercase rounded-xl shadow-xl shadow-black/10 hover:bg-yellow-400 hover:text-black hover:shadow-yellow-400/20 active:scale-98 transition-all duration-200">
              Enroll Now
            </button>
          </div>
        </div> */}

        {/* Right Columns - Retains clear layout space matching the model composition */}
        <div className="hidden lg:block lg:col-span-5 h-full relative" />
      </div>

    </div>
  );
};

export default HeaderOverlay;