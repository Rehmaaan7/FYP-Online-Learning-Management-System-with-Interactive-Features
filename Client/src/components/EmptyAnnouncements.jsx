import { Megaphone, Bell, Sparkles } from 'lucide-react';
import React from 'react'
import { useNavigate } from "react-router-dom";

function EmptyAnnouncements() {
  const navigate = useNavigate()
  
  return (
    // Fixed viewport lock with a clean, milky-white pearl backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 p-6 backdrop-blur-md">
      
      {/* 1. Soft, Elegant Ambient Pastel Glows */}
      <div className="absolute top-[30%] left-[35%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-200/40 blur-[130px] animate-pulse [animation-duration:8s]" />
      <div className="absolute top-[40%] left-[55%] -z-10 h-[350px] w-[350px] rounded-full bg-purple-200/30 blur-[110px] mix-blend-multiply animate-pulse [animation-duration:12s]" />
      <div className="absolute top-[50%] left-[45%] -z-10 h-[250px] w-[450px] rounded-full bg-cyan-100/40 blur-[90px]" />

      {/* 2. Frosted Milk-Glass Card Container */}
      <div className="relative flex max-w-2xl w-full animate-in fade-in zoom-in-95 duration-1000 flex-col items-center px-8 py-16 md:p-20 rounded-3xl border border-white bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        
        {/* Subtle top edge highlighting */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-cyan-200/20 to-transparent opacity-60" />

        {/* 3. The Broadcast Animation Shell */}
        <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
          {/* Pulsing Soundwave Rings */}
          <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/10 [animation-duration:3s]" />
          <div className="absolute -inset-4 animate-ping rounded-full bg-blue-500/5 [animation-duration:4s] [animation-delay:1s]" />
          
          {/* Main Floating Icon Container */}
          <div className="relative flex h-20 w-20 animate-bounce [animation-duration:5s] items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-xl shadow-cyan-500/5">
            <Megaphone className="h-9 w-9 text-cyan-600 drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]" />
            <Bell className="absolute -top-1 -right-1 h-5 w-4 text-purple-500 animate-pulse" />
          </div>
        </div>

        {/* 4. Beautiful Soft Charcoal Typography */}
        <h1 className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-center text-4xl font-black uppercase tracking-wider text-transparent sm:text-5xl md:text-6xl">
          All quiet on <br /> the news front
        </h1>

        {/* 5. Clean, Readable Description */}
        <p className="mt-6 max-w-md text-center text-base leading-relaxed text-slate-500 md:text-lg">
          Your feed is completely up to date. We’ll notify you right here as soon as important updates, schedule shifts, or alerts are broadcasted.
        </p>

        {/* 6. High-End Border Button with Hover Scale */}
        <div className="mt-12">
          <button
            onClick={() => navigate(-1)}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-slate-800 shadow-md transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg active:scale-[0.98]"
          >
            <span className="relative z-10">Return</span>
            <Sparkles className="h-4 w-4 text-slate-400 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default EmptyAnnouncements;