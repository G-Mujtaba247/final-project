import React from 'react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { Search, Compass } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Immersive Background Image with Multi-layered Overlay */}
      <div className="absolute inset-0 z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]">
        <img 
          src="/image1.jpg" 
          alt="Northern Pakistan Peaks" 
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200";
          }}
        />
        {/* Multilayered Gradient: Top shade, bottom darkness for seamless layout integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/30 to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/45 to-transparent"></div>
      </div>

      {/* Floating Sparkle Animation Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-1/4 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float animate-delay-2000"></div>

      {/* Content Area */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-8">
        
        {/* Dynamic Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs md:text-sm uppercase tracking-[0.2em] text-accent font-semibold border border-white/20 backdrop-blur-md animate-bounce">
          <Compass className="w-4 h-4" />
          The Ultimate Pakistani Odyssey
        </div>

        {/* Dynamic Typography */}
        <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-xl">
          Discover the Majesty of <br />
          <span className="bg-gradient-to-r from-accent via-secondary to-white bg-clip-text text-transparent">
            Pakistan's Wilderness
          </span>
        </h1>

        <p className="text-base md:text-xl text-slate-100 max-w-3xl leading-relaxed drop-shadow-md">
          From the historical monuments of Lahore to the cloud-kissing peaks of Swat, Hunza, and Murree. Plan and book premium adventures with local expert guides.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center max-w-md">
          <Button 
            onClick={() => navigate("/tours")} 
            className="bg-secondary hover:bg-secondary/95 text-white glow-hover px-8 py-7 text-base font-semibold rounded-2xl border-0 shadow-lg cursor-pointer"
          >
            <Search className="w-5 h-5 mr-2" /> Explore Packages
          </Button>
          <Button 
            onClick={() => navigate("/about")}  
            variant="outline" 
            className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white px-8 py-7 text-base font-semibold rounded-2xl backdrop-blur-md shadow-md transition-all cursor-pointer"
          >
            Our Story
          </Button>
        </div>

        {/* Elegant Glassmorphic Travel Stats Bar */}
        <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 p-6 rounded-3xl glass-card text-slate-900 max-w-2xl w-full border border-white/10 shadow-2xl">
          <div className="text-center">
            <h3 className="text-xl md:text-3xl font-extrabold text-primary">50+</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">Destinations</p>
          </div>
          <div className="border-x border-slate-200 text-center">
            <h3 className="text-xl md:text-3xl font-extrabold text-primary">1,200+</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">Happy Tourists</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-3xl font-extrabold text-primary">4.9/5</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">Average Rating</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
