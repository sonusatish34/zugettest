"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STEPS = [
  {
    step: "01",
    title: "Register",
    headline: "Create your seller account",
    desc: "Fill in your shop details, upload your store logo, and complete onboarding requirements to get verified instantly.",
    bullets: ["Business name & address", "Bank account for payouts"],
    image: "/stepstosell/Register.webp",
    accent: "#8b5cf6", // Vibrant Violet
    gradient: "from-violet-500/20 via-violet-900/10 to-gray-900",
  },
  {
    step: "02",
    title: "List Your Clothes",
    headline: "Upload your clothing catalogue",
    desc: "Add your products — dresses, kurtas, jackets, anything you sell. Set sizes, prices, and stock with our easy-to-use dashboard.",
    bullets: ["Product photos & descriptions", "Size & inventory setup"],
    image: "/stepstosell/Sell.webp",
    accent: "#10b981", // Emerald Green
    gradient: "from-emerald-500/20 via-emerald-900/10 to-gray-900",
  },
  {
    step: "03",
    title: "Earn",
    headline: "Get paid on time, every time",
    desc: "When a customer orders your clothes, you earn. Zuget processes secure payments directly to your account without delays.",
    bullets: ["Transparent payment cycle", "Auto settlement to bank"],
    image: "/stepstosell/Earn.webp",
    accent: "#f43f5e", // Rose Pink
    gradient: "from-rose-500/20 via-rose-900/10 to-gray-900",
  },
  {
    step: "04",
    title: "Grow",
    headline: "Scale your clothing business",
    desc: "Get tailored support, promotional tools, and deep analytics to understand your customers and grow your store.",
    bullets: ["Seller analytics & insights", "Promotional campaigns"],
    image: "/stepstosell/Grow.webp",
    accent: "#3b82f6", // Bright Blue
    gradient: "from-blue-500/20 via-blue-900/10 to-gray-900",
  },
];

// Container animation for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ZugetSellingStepsGrid() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden min-h-screen bg-gray-950 flex flex-col items-center justify-center">
      
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black z-0" />
      <div 
        className="absolute inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10 w-full">
        
        {/* --- HIGHLIGHTED HEADER SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 md:mb-28 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 bg-white/5 backdrop-blur-md text-gray-200 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] uppercase tracking-wider">
            ✨ Seamless Onboarding
          </span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
            Start Selling on <br className="hidden sm:block" />
            <span className="relative inline-block mt-2">
              {/* Massive Glowing Aura behind the text */}
              <span className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-pink-500 to-amber-500 opacity-40 blur-3xl rounded-full animate-pulse z-0"></span>
              {/* Vibrant Gradient Text */}
              <span className="relative z-10 bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
                Zuget Today
              </span>
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
            Launch your digital clothing store in 4 simple steps. All your tools in one place, so you can focus entirely on the fashion.
          </p>
        </motion.div>

        {/* The Grid / Bento Box Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gray-900/50 backdrop-blur-sm min-h-[420px] flex flex-col justify-end transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
            >
              {/* --- Background Visuals & External Images --- */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                
                {/* Your External Webp Image */}
                <div className="absolute right-0 top-0 w-full sm:w-3/4 h-3/4 sm:h-full transition-transform duration-700 ease-out group-hover:scale-105 z-0">
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    fill
                    className="object-cover object-center sm:object-right opacity-40 group-hover:opacity-70 mix-blend-lighten transition-all duration-500"
                  />
                </div>

                {/* Gradients to fade image smoothly into the dark card */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent sm:bg-gradient-to-l sm:from-transparent sm:via-gray-950/80 sm:to-gray-950 z-10" />
                
                {/* Dynamic colored gradient background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-700 z-10`}
                />
              </div>

              {/* --- Card Content --- */}
              <div className="relative z-20 p-8 sm:p-10 flex flex-col h-full">
                
                {/* Top: Badge */}
                <div className="mb-auto">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white mb-6 border border-white/20 backdrop-blur-md shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      backgroundColor: `${step.accent}90`,
                      boxShadow: `0 10px 30px -10px ${step.accent}`
                    }}
                  >
                    {step.step}
                  </div>
                </div>

                {/* Bottom: Text & Bullets */}
                <div className="mt-8 max-w-[90%] sm:max-w-[80%]">
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight  transition-all duration-300"
                      >
                    {step.title}
                  </h3>
                  
                  <h4 className="text-base font-semibold mb-4 tracking-wide uppercase drop-shadow-md" style={{ color: step.accent }}>
                    {step.headline}
                  </h4>
                  
                  <p className="text-gray-300 text-base leading-relaxed mb-8 font-light drop-shadow-md">
                    {step.desc}
                  </p>
                  
                  {/* Bullets */}
                  <div className="flex flex-col gap-4">
                    {step.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-gray-950/40 backdrop-blur-sm w-fit px-4 py-2 rounded-full border border-white/5">
                        <div 
                          className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                          style={{ backgroundColor: step.accent, color: step.accent }}
                        />
                        <span className="text-sm text-gray-200 font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Hover Light Flare effect on the border */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30"
                style={{ 
                  background: `linear-gradient(135deg, transparent, ${step.accent}80, transparent) border-box`,
                  WebkitMask: `linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)`,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}