"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MARQUEE_ITEMS = [
  "Free same-day delivery",
  "Virtual try-on",
  "Hyderabad's fashion hub",
  "500+ local stores",
  "Instant returns",
  "New arrivals daily",
  "Exclusive drops",
  "Style your city",
];

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Zuget Partner", href: "/#partner" },
  { label: "Customer App", href: "/#customer" },
  { label: "About Us", href: "/about-us" },
];

function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300/70"
          >
            <span className="h-[3px] w-[3px] rounded-full bg-fuchsia-400/50" />
            {text}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent" />
    </div>
  );
}

function AnimatedCounter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1400;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 500, suffix: "+", label: "Local Stores" },
  { value: 45, suffix: "min", label: "Avg Delivery" },
  { value: 12, suffix: "k+", label: "Happy Shoppers" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-zinc-950 text-zinc-300">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]" />

      {/* Top marquee */}
      <MarqueeStrip />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Stats row */}
        <div className="mb-16 grid grid-cols-3 divide-x divide-white/[0.06] border border-white/[0.06] bg-white/[0.02]">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center gap-1 px-4 py-6 transition-colors hover:bg-white/[0.03]"
            >
              <span className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-zinc-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <div>
              <span className="font-display text-[2.8rem] font-black leading-none tracking-tighter text-white sm:text-[3.5rem]">
                Zuget
              </span>
              <span className="ml-2 inline-block -translate-y-1 rounded bg-fuchsia-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                HYD
              </span>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-zinc-400">
              Hyperlocal fashion for stores and shoppers across Hyderabad. Partner with us to sell online — or shop with instant delivery and virtual try-on.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500" />
              </span>
              <span className="text-fuchsia-300/80">Live in Hyderabad · Delivering now</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Explore
            </h3>
            <ul className="space-y-1">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 py-1.5 text-[15px] text-zinc-400 transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-px w-0 bg-fuchsia-400 transition-all duration-200 group-hover:w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+919111911162"
                className="group flex items-start gap-3 text-[15px] transition-colors hover:text-white"
              >
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-zinc-400 transition-colors group-hover:text-white">+91 9111 911 162</span>
              </a>
              <a
                href="mailto:support@zuget.in"
                className="group flex items-start gap-3 text-[15px] transition-colors"
              >
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-zinc-400 transition-colors group-hover:text-white">support@zuget.in</span>
              </a>
              <div className="flex items-start gap-3 text-[15px]">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-zinc-500">Hyderabad, Telangana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-[13px] text-zinc-600">
            © 2026 Zuget · Built for hyperlocal fashion
          </p>
          <div className="flex items-center gap-1.5 text-[13px] text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500/60" />
            <span>Fashion · Fast · Hyderabad</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .font-display {
          font-family: 'Georgia', 'Times New Roman', serif;
        }
      `}</style>
    </footer>
  );
}
