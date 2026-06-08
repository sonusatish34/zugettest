"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const ITEMS = [
  { id: 1, emoji: "👗", label: "Summer Dress", color: "#e91e8c", link: "https://www.zara.com/us/en/woman-dresses-l1066.html" },
  { id: 2, emoji: "👕", label: "Linen Tee", color: "#3b82f6", link: "https://www.hm.com/us/products/t-shirts" },
  { id: 3, emoji: "👠", label: "Heels", color: "#f97316", link: "https://www.asos.com/women/shoes/heels" },
  { id: 4, emoji: "👒", label: "Sun Hat", color: "#f59e0b", link: "https://www.nordstrom.com/sr?keyword=sun+hat" },
  { id: 5, emoji: "👜", label: "Tote Bag", color: "#8b5cf6", link: "https://www.shopbop.com/bags" },
  { id: 6, emoji: "🕶️", label: "Sunglasses", color: "#10b981", link: "https://www.warbyparker.com/sunglasses" },
  { id: 7, emoji: "🧣", label: "Silk Scarf", color: "#ec4899", link: "https://www.hermes.com/us/en/category/women/scarves-and-silks/" },
  { id: 8, emoji: "👟", label: "Sneakers", color: "#14b8a6", link: "https://www.nike.com/w/womens-shoes" },
  { id: 9, emoji: "💍", label: "Gold Ring", color: "#d97706", link: "https://www.mejuri.com/collections/rings" },
  { id: 10, emoji: "🧥", label: "Trench Coat", color: "#6366f1", link: "https://www.burberry.com/trench-coats" },
  { id: 11, emoji: "🩱", label: "Swimsuit", color: "#c026d3", link: "https://www.aerie.com/swim" },
  { id: 12, emoji: "🧤", label: "Gloves", color: "#ef4444", link: "https://www.nordstrom.com/sr?keyword=gloves" },
];

export default function InteractiveLookbook() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const footerCountRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Body, Events } = Matter;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    
    let cw = wrap.clientWidth;
    let ch = wrap.clientHeight;
    
    const isMobile = () => window.innerWidth < 520;
    const PILL_W = () => (isMobile() ? 64 : 82);
    const PILL_H = () => (isMobile() ? 28 : 36);
    const EMOJI_SIZE = () => (isMobile() ? 16 : 20);
    const COUNT = () => (isMobile() ? 16 : window.innerWidth < 900 ? 22 : 30);

    // Engine setup
    const engine = Engine.create({ gravity: { x: 0, y: 0.28 } });
    engineRef.current = engine;
    const world = engine.world;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        background: "transparent",
        wireframes: false,
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Boundaries
    const T = 60;
    const wallOptions = { isStatic: true, render: { visible: false }, friction: 0.3, restitution: 0.4 };
    Composite.add(world, [
      Bodies.rectangle(cw / 2, ch + T / 2, cw + T * 2, T, wallOptions),
      Bodies.rectangle(-T / 2, ch / 2, T, ch + T * 2, wallOptions),
      Bodies.rectangle(cw + T / 2, ch / 2, T, ch + T * 2, wallOptions),
      Bodies.rectangle(cw / 2, -T / 2, cw + T * 2, T, wallOptions),
    ]);

    const pw = PILL_W();
    const ph = PILL_H();
    const es = EMOJI_SIZE();
    const cnt = COUNT();
    
    if (footerCountRef.current) {
      footerCountRef.current.textContent = `${cnt} items · ${ITEMS.length} styles`;
    }

    let bodies = [];
    let hoveredId = null;
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
    let lastScrollY = window.scrollY;

    // Custom Rendering for Pills
    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      bodies.forEach((b) => {
        const item = ITEMS.find((f) => f.id === b._fid);
        if (!item) return;
        
        const { x, y } = b.position;
        const a = b.angle;
        const hov = b._fid === hoveredId;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2);
        ctx.fillStyle = hov ? item.color : item.color + "dd";
        ctx.fill();
        
        if (hov) {
          ctx.strokeStyle = "rgba(255,255,255,0.8)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        ctx.font = `${es}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.fillText(item.emoji, -pw / 4, 1);
        
        ctx.font = `bold ${isMobile() ? 7.5 : 9}px system-ui`;
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillText(item.label, pw / 8, 1);
        ctx.restore();
      });
    });

    // Spawn Items
    for (let i = 0; i < cnt; i++) {
      const item = ITEMS[i % ITEMS.length];
      const x = Math.random() * (cw - pw - 20) + pw / 2 + 10;
      const y = Math.random() * ch * 0.55 + 10;
      const b = Bodies.rectangle(x, y, pw * 0.92, ph * 0.9, {
        restitution: 0.52,
        frictionAir: 0.028,
        friction: 0.1,
        chamfer: { radius: ph / 2 },
        render: { fillStyle: "transparent", strokeStyle: "transparent", lineWidth: 0 },
      });
      b._fid = item.id;
      Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.3);
      bodies.push(b);
    }
    Composite.add(world, bodies);

    // Interaction Functions
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const sx = cw / rect.width;
      const sy = ch / rect.height;
      const mx = (e.clientX - rect.left) * sx;
      const my = (e.clientY - rect.top) * sy;
      
      mouse.vx = mx - mouse.px;
      mouse.vy = my - mouse.py;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = mx;
      mouse.y = my;
      
      const RADIUS = 120;
      const spd = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      
      if (spd > 1) {
        bodies.forEach((b) => {
          const dx = b.position.x - mx;
          const dy = b.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS && dist > 1) {
            const pow = ((RADIUS - dist) / RADIUS) * 0.0012 * Math.min(spd, 30);
            Body.applyForce(b, b.position, {
              x: (dx / dist) * pow + mouse.vx * 0.00015,
              y: (dy / dist) * pow + mouse.vy * 0.00015,
            });
          }
        });
      }
      
      let found = null;
      bodies.forEach((b) => {
        const dx = b.position.x - mx;
        const dy = b.position.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < pw / 1.8) found = b._fid;
      });
      
      hoveredId = found;
      canvas.style.cursor = found ? "pointer" : "default";
      
      if (found && tooltip) {
        const item = ITEMS.find((f) => f.id === found);
        if (item) {
          tooltip.style.display = "block";
          tooltip.style.left = `${e.clientX + 14}px`;
          tooltip.style.top = `${e.clientY - 38}px`;
          tooltip.textContent = item.label;
        }
      } else if (tooltip) {
        tooltip.style.display = "none";
      }
    };

    const handleMouseLeave = () => {
      hoveredId = null;
      if (tooltip) tooltip.style.display = "none";
    };

    const handleTouchMove = (e) => {
      if (!e.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      const sx = cw / rect.width;
      const sy = ch / rect.height;
      const mx = (e.touches[0].clientX - rect.left) * sx;
      const my = (e.touches[0].clientY - rect.top) * sy;
      
      bodies.forEach((b) => {
        const dx = b.position.x - mx;
        const dy = b.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90 && dist > 1) {
          const pow = ((90 - dist) / 90) * 0.0018;
          Body.applyForce(b, b.position, {
            x: (dx / dist) * pow,
            y: (dy / dist) * pow - 0.0005,
          });
        }
      });
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const sx = cw / rect.width;
      const sy = ch / rect.height;
      let cx, cy;
      
      if (e.type === "touchend" && e.changedTouches.length) {
        cx = (e.changedTouches[0].clientX - rect.left) * sx;
        cy = (e.changedTouches[0].clientY - rect.top) * sy;
      } else {
        cx = (e.clientX - rect.left) * sx;
        cy = (e.clientY - rect.top) * sy;
      }
      
      bodies.forEach((b) => {
        const dx = b.position.x - cx;
        const dy = b.position.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) < pw / 1.8) {
          const item = ITEMS.find((f) => f.id === b._fid);
          if (item) {
            Body.applyForce(b, b.position, { x: (Math.random() - 0.5) * 0.02, y: -0.025 });
            Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.5);
            setTimeout(() => window.open(item.link, "_blank", "noopener,noreferrer"), 120);
          }
        }
      });
    };

    const handleScroll = () => {
      const d = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (Math.abs(d) < 0.5) return;
      const f = Math.min(Math.abs(d) * 0.0007, 0.04);
      bodies.forEach((b) => {
        Body.applyForce(b, b.position, {
          x: (d > 0 ? 1 : -1) * f * 1.2 + (Math.random() - 0.5) * 0.015,
          y: -f * (0.8 + Math.random() * 1.8),
        });
        Body.setAngularVelocity(b, b.angularVelocity + (Math.random() - 0.5) * 0.08);
      });
    };

    const handleResize = () => {
      cw = wrap.clientWidth;
      ch = wrap.clientHeight;
      render.canvas.width = cw;
      render.canvas.height = ch;
      render.options.width = cw;
      render.options.height = ch;
      
      // Update Boundaries roughly based on new size
      Composite.clear(world);
      Composite.add(world, [
        Bodies.rectangle(cw / 2, ch + T / 2, cw + T * 2, T, wallOptions),
        Bodies.rectangle(-T / 2, ch / 2, T, ch + T * 2, wallOptions),
        Bodies.rectangle(cw + T / 2, ch / 2, T, ch + T * 2, wallOptions),
        Bodies.rectangle(cw / 2, -T / 2, cw + T * 2, T, wallOptions),
      ]);
      Composite.add(world, bodies);
    };

    // Random pops
    const intervalId = setInterval(() => {
      if (bodies.length === 0) return;
      const b = bodies[Math.floor(Math.random() * bodies.length)];
      if (b) {
        Body.applyForce(b, b.position, {
          x: (Math.random() - 0.5) * 0.006,
          y: -Math.random() * 0.005,
        });
      }
    }, 900);

    // Event Listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchend", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchend", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <>
      {/* Custom Animations for specific visuals. 
        Placed here to keep the component cleanly self-contained without needing tailwind.config.js modifications. 
      */}
      <style>{`
        @keyframes pulse-orb {
          from { transform: scale(1); opacity: 0.55; }
          to { transform: scale(1.18); opacity: 0.85; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>

      <div
        ref={wrapRef}
        className="relative w-full h-[520px] max-sm:h-[360px] overflow-hidden bg-gradient-to-br from-[#fce4ec] via-[#e8eaf6] to-[#f3e5f5] font-sans"
      >
        {/* Background Orbs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 220, height: 220, top: -60, left: -40, background: "radial-gradient(circle, rgba(233,30,140,0.3), transparent 70%)", animation: "pulse-orb 6s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 180, height: 180, bottom: -30, right: -20, background: "radial-gradient(circle, rgba(103,58,183,0.25), transparent 70%)", animation: "pulse-orb 6s ease-in-out infinite alternate 2s" }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 150, height: 150, top: "30%", left: "60%", background: "radial-gradient(circle, rgba(0,188,212,0.2), transparent 70%)", animation: "pulse-orb 6s ease-in-out infinite alternate 1s" }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 130, height: 130, top: "60%", left: "15%", background: "radial-gradient(circle, rgba(255,193,7,0.2), transparent 70%)", animation: "pulse-orb 6s ease-in-out infinite alternate 3s" }}
        />

        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(150,100,200,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(150,100,200,0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px"
          }}
        />

        {/* Physics Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full block" />

        {/* Centered Overlay */}
        <div className="absolute inset-0 z-[5] pointer-events-none flex flex-col items-center justify-center text-center">
          <div 
            className="inline-block bg-white/60 border border-[#c896c8]/40 px-3.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-violet-600 mb-2.5"
            style={{ animation: "slide-down 0.7s ease both" }}
          >
            ✦ Interactive Lookbook ✦
          </div>
          <div 
            className="text-[clamp(30px,7vw,54px)] font-black tracking-tighter text-[#1a1a2e] leading-none font-serif"
            style={{ animation: "fade-up 0.9s ease 0.2s both" }}
          >
            SUMMER<br />
            <span className="text-[#e91e8c]">DROPS</span>
          </div>
          <div 
            className="text-[clamp(10px,2vw,12px)] text-[#3c2850]/50 mt-2 max-w-[200px] leading-relaxed"
            style={{ animation: "fade-up 0.9s ease 0.4s both" }}
          >
            Move cursor to blow · Scroll for wind · Click to shop
          </div>
        </div>

        {/* Footer Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex justify-between items-center px-4 pt-3.5 pb-2.5 bg-gradient-to-t from-[rgba(220,200,240,0.5)] to-transparent text-[10px] tracking-[0.08em] uppercase text-[#502864]/45">
          <span ref={footerCountRef}></span>
          <span>Physics-powered ✦</span>
        </div>
      </div>

      {/* Tooltip (Renders outside main wrap to avoid clipping) */}
      <div
        ref={tooltipRef}
        className="fixed z-[9999] pointer-events-none bg-white/95 border border-[#b478dc]/30 px-3.5 py-1.5 text-xs font-semibold text-[#4a1472] whitespace-nowrap shadow-[0_4px_16px_rgba(180,100,240,0.15)] hidden"
        style={{ animation: "fade-in 0.12s ease" }}
      />
    </>
  );
}