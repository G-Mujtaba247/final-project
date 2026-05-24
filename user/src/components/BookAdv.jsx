import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from "react-router";
import { ArrowUpRight, Search } from 'lucide-react';

const BookAdv = () => {
    const navigate = useNavigate();
    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="relative w-full h-64 md:h-80 lg:h-[400px] rounded-[2.5rem] overflow-hidden flex items-center justify-center shadow-2xl">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: "url('/Booking.jpg')" }}
                >
                    {/* Multi-layered overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Floating glow orbs */}
                <div className="absolute top-8 right-12 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-8 left-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                    {/* Badge */}
                    <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent border border-white/15 backdrop-blur-md mb-5">
                        Start Your Journey
                    </span>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-xl tracking-tight">
                        Ready to book your <br className="hidden sm:block" /> next adventure?
                    </h2>
                    <p className="text-base md:text-lg text-slate-200 mb-8 max-w-xl mx-auto leading-relaxed">
                        Browse our collection of tours and secure your spot on the mountain today.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button
                            onClick={() => navigate("/tours")}
                            className="bg-white text-primary hover:bg-accent hover:text-white px-8 py-4 text-sm font-bold rounded-2xl shadow-lg transition-all duration-300 glow-hover cursor-pointer flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" /> Browse Tours
                        </Button>
                        <Button
                            onClick={() => navigate("/booking")}
                            className="bg-secondary text-white hover:bg-secondary/90 px-8 py-4 text-sm font-bold rounded-2xl shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2"
                        >
                            My Bookings <ArrowUpRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookAdv;
