"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Tops & Dresses",
    count: "2,400+ styles",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935",
  },
  {
    title: "Men's Topwear",
    count: "1,800+ styles",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    title: "Women's Ethnic",
    count: "3,100+ styles",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
  },
  {
    title: "Winter Wear",
    count: "900+ styles",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    title: "Jeans & Pants",
    count: "1,200+ styles",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
  },
  {
    title: "New Arrivals",
    count: "Daily Drops",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  },
];

export default function ShopByCat() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-32">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950" />

      {/* Blur Orbs (Neon Dark Mode Glows) */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-rose-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="container relative mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20">

          <div>
            <span className="text-sm tracking-[0.35em] uppercase text-rose-400 font-semibold">
              Shop By Category
            </span>

            <h2 className="mt-6 text-6xl md:text-7xl font-bold text-white leading-none">
              Everything you
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent drop-shadow-lg">
                love, faster.
              </span>
            </h2>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="mt-10 lg:mt-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 font-medium shadow-lg transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] text-white"
          >
            View all categories →
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -12,
              }}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gray-900/50 backdrop-blur-xl shadow-2xl hover:border-white/20 hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-80 mix-blend-lighten transition duration-700 group-hover:scale-110 group-hover:opacity-100"
                />

                {/* Darker overlay for text readability in dark mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white w-full">

                <h3 className="text-xl font-semibold drop-shadow-md">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-300 drop-shadow-md">
                  {item.count}
                </p>
              </div>

              {/* Hover Glow inside card */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}