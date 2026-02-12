import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#793FDF]/5 via-white to-[#793FDF]/10 text-gray-900">

      {/* Soft Decorative Gradient Blur */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#793FDF]/15 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#793FDF]/15 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Image
              src="/logo.webp"
              alt="ZuGet"
              width={250}
              height={250}
              className="w-32 mb-4"
            />

            <p className="text-lg lg:text-xl font-medium text-gray-800">
              Your city’s fashion,{" "}
              <span className="text-[#793FDF] font-semibold">
                delivered fast
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-black mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              {["About Us", "Careers", "Contact"].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#793FDF] transition-all duration-300 hover:translate-x-1 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-black mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              {["Help Center", "Track Order", "Returns"].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#793FDF] transition-all duration-300 hover:translate-x-1 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-black mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="hover:text-[#793FDF] transition hover:translate-x-1">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="hover:text-[#793FDF] transition hover:translate-x-1">
                <Link href="/privacy-policy-merchant">
                  Privacy Policy Merchant
                </Link>
              </li>
              <li className="hover:text-[#793FDF] transition hover:translate-x-1">
                <Link href="/privacy-policy-delivery">
                  Privacy Policy Delivery Partner
                </Link>
              </li>
              <li className="hover:text-[#793FDF] transition hover:translate-x-1 cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-[#793FDF] transition hover:translate-x-1 cursor-pointer">
                Cookie Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © 2026 ZuGet. Fast fashion delivery, redefined.
        </div>
      </div>
    </footer>
  );
};

export default Footer;