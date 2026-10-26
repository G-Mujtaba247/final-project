import React from 'react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { Search, Compass, ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/image1.jpg"
          alt="Northern Pakistan mountains and valleys"
          className="h-full w-full object-cover object-center"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/45 to-primary/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/5 to-primary/20" />
      </div>

      <div className="absolute left-8 top-1/4 h-24 w-24 rounded-full bg-secondary/15 blur-3xl md:left-20" />
      <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl md:right-24" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center md:gap-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-md md:text-xs">
          <Compass className="h-4 w-4" />
          The Ultimate Pakistani Odyssey
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-xl md:text-6xl lg:text-7xl">
          Discover the Majesty of
          <span className="mt-2 block bg-gradient-to-r from-amber-200 via-emerald-200 to-white bg-clip-text text-transparent">
            Pakistan's Wilderness
          </span>
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-slate-100 md:text-xl">
          Experience the snow-capped peaks of Hunza, the lakes of Skardu, and the heritage of Lahore with handcrafted tours designed for modern explorers.
        </p>

        <div className="flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => navigate("/tours")}
            className="h-14 rounded-2xl bg-secondary px-7 text-base font-semibold text-white shadow-xl shadow-emerald-900/20 transition hover:bg-secondary/90"
          >
            <Search className="mr-2 h-5 w-5" /> Explore Packages
          </Button>
          <Button
            onClick={() => navigate("/about")}
            variant="outline"
            className="h-14 rounded-2xl border border-white/25 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/15 hover:text-white"
          >
            Our Story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 grid w-full max-w-2xl grid-cols-3 gap-3 rounded-[28px] border border-white/10 bg-white/10 p-4 text-slate-900 shadow-2xl backdrop-blur-lg md:gap-6 md:p-6">
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-white md:text-3xl">50+</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-200 md:text-xs">Destinations</p>
          </div>
          <div className="border-x border-white/15 text-center">
            <h3 className="text-xl font-extrabold text-white md:text-3xl">1,200+</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-200 md:text-xs">Happy Travelers</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-white md:text-3xl">4.9/5</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-200 md:text-xs">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
