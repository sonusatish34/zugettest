"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Tops & Dresses",
    count: "2,400+ styles",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935",
  },
  {
    title: "Men's Topwear",
    count: "1,800+ styles",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    title: "Women's Ethnic",
    count: "3,100+ styles",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
  },
  {
    title: "Winter Wear",
    count: "900+ styles",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    title: "Jeans & Pants",
    count: "1,200+ styles",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
  },
  {
    title: "New Arrivals",
    count: "Daily Drops",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  },
];

export default function ShopByCat() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-2 lg:py-32 font-sans">

      {/* Trendy Light Background Elements */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Soft Accent Glows */}
      <div className="absolute top-20 left-10 md:left-20 h-72 w-72 rounded-full bg-[#793FDF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 md:right-20 h-80 w-80 rounded-full bg-[#793FDF]/5 blur-[140px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-5 md:px-8 max-w-[1400px]">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20">

          <div>
            <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#793FDF] font-bold bg-[#793FDF]/10 px-4 py-2 rounded-full">
              Shop By Category
            </span>

            <h2 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Everything you
              <br />
              <span className="text-[#793FDF]">love, faster.</span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 lg:mt-0 rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold shadow-sm transition-all hover:border-[#793FDF]/30 hover:shadow-[0_10px_30px_rgba(121,63,223,0.15)] text-[#793FDF] flex items-center gap-2 group"
          >
            View all categories
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 shadow-sm hover:shadow-[0_20px_40px_rgba(121,63,223,0.12)] transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Darker overlay at the bottom for crisp text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white w-full z-10">
                <h3 className="text-xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-slate-300">
                  {item.count}
                </p>
              </div>

              {/* Hover Glow inside card */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-[#793FDF]/20 to-transparent pointer-events-none mix-blend-overlay" />
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}