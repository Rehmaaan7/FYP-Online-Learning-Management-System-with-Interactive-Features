import React from 'react'
import { MessageSquareOff, MessageSquarePlus, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EmptyPostsForum = () => {
    const navigate = useNavigate()
 return (
    // Fixed inset-0 locks this overlay over the entire viewport, perfectly centering it
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/60 p-6 backdrop-blur-sm dark:bg-slate-950/60">
      
      {/* 1. Moving Mesh Gradients in Background */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-indigo-500/10 blur-[100px] [animation-duration:6s] dark:bg-indigo-500/5" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-400/10 blur-[80px] mix-blend-multiply dark:bg-violet-500/5" />

      {/* 2. Entrance Animation for the Glassmorphic Card */}
      <div className="flex max-w-xl animate-in fade-in zoom-in-95 duration-700 flex-col items-center p-8 md:p-14 rounded-3xl border border-slate-200/50 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:border-slate-800/50 dark:bg-slate-900/70">
        
        {/* 3. Infinite Floating Icon Wrapper */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center animate-bounce [animation-duration:4s]">
          {/* Subtle spinning aura */}
          <div className="absolute inset-0 animate-spin [animation-duration:12s] rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 opacity-25 blur-md" />
          
          {/* Main Icon Container */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200/80 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
            <MessageSquarePlus className="h-9 w-9 text-indigo-500 dark:text-indigo-400 animate-pulse [animation-duration:3s]" />
            <Sparkles className="absolute -top-1 -right-1 h-5 w-4 text-amber-400 animate-bounce [animation-duration:2s]" />
          </div>
        </div>

        {/* 4. Beautiful Text Gradient with Slide-Up Entrance Effect */}
        <h1 className="bg-gradient-to-b from-slate-950 via-slate-800 to-slate-500 bg-clip-text text-center text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-6xl dark:from-white dark:via-slate-200 dark:to-slate-500">
          No course forum <br /> created yet
        </h1>

        {/* 5. Smooth text description */}
        <p className="mt-6 max-w-md text-base leading-relaxed text-slate-500/90 md:text-lg dark:text-slate-400/90">
          This digital space is reserved for community discussions. It will smoothly unlock the moment your instructor opens the board.
        </p>

        {/* 6. High-end Action Button with scale-on-click */}
        <div className="mt-10">
          <button onClick={(()=>navigate(-1))}
           className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:bg-slate-900 hover:scale-105 active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
            Return 
          </button>
        </div>

      </div>
    </div>
  );
}


export default EmptyPostsForum
