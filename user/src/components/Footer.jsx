import React from 'react';
import { Button } from "./ui/button";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from 'react-router';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-primary text-white mt-8">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-5">
                        <div className="flex items-center gap-3">
                            <img src="logo.png" alt="logo" className='w-12 h-12 md:w-14 md:h-14 brightness-200'
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div>
                                <p className="text-lg font-extrabold uppercase tracking-[0.2em] text-white">Explore Pakistan</p>
                                <p className="text-xs text-slate-400 font-medium">Travel simplified.</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Your gateway to the world's most breathtaking landscapes, heritage sites, and cultural adventures in Pakistan.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                                <span>Islamabad, Pakistan</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                                <span>hello@explorepakistan.pk</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                                <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                                <span>+92 300 1234567</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="md:col-span-5 grid grid-cols-3 gap-6">
                        {/* Explore */}
                        <div>
                            <h3 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Explore</h3>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><NavLink to="/" className="hover:text-accent transition-colors duration-200">Home</NavLink></li>
                                <li><NavLink to="/tours" className="hover:text-accent transition-colors duration-200">Tours</NavLink></li>
                                <li><NavLink to="/about" className="hover:text-accent transition-colors duration-200">About</NavLink></li>
                                <li><NavLink to="/contact" className="hover:text-accent transition-colors duration-200">Contact</NavLink></li>
                                <li><NavLink to="/booking" className="hover:text-accent transition-colors duration-200">Bookings</NavLink></li>
                            </ul>
                        </div>
                        {/* Company */}
                        <div>
                            <h3 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Company</h3>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><NavLink to="/tours" className="hover:text-accent transition-colors duration-200">Tours</NavLink></li>
                                <li><NavLink to="/booking" className="hover:text-accent transition-colors duration-200">Bookings</NavLink></li>
                                <li><NavLink to="/about" className="hover:text-accent transition-colors duration-200">About</NavLink></li>
                                <li><NavLink to="/contact" className="hover:text-accent transition-colors duration-200">Support</NavLink></li>
                            </ul>
                        </div>
                        {/* Help */}
                        <div>
                            <h3 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Help</h3>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li><NavLink to="/faq" className="hover:text-accent transition-colors duration-200">FAQ</NavLink></li>
                                <li><NavLink to="/contact" className="hover:text-accent transition-colors duration-200">Contact</NavLink></li>
                                <li><NavLink to="/policies" className="hover:text-accent transition-colors duration-200">Safety</NavLink></li>
                                <li><NavLink to="/policies" className="hover:text-accent transition-colors duration-200">Policies</NavLink></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="md:col-span-3">
                        <h3 className="font-bold mb-2 text-white text-sm uppercase tracking-wider">Newsletter</h3>
                        <p className="text-slate-400 mb-5 text-xs leading-relaxed">Get the latest tour updates and travel tips delivered to your inbox.</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 text-xs outline-none focus:ring-1 focus:ring-secondary transition"
                                />
                                <Button className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm shrink-0 cursor-pointer">
                                    Go
                                </Button>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight">By subscribing you agree to our Privacy Policy.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© 2025 Explore Pakistan. All rights reserved.</p>
                    <div className="flex gap-6">
                        <NavLink to="/policies" className="hover:text-accent transition-colors duration-200">Privacy Policy</NavLink>
                        <NavLink to="/terms" className="hover:text-accent transition-colors duration-200">Terms of Service</NavLink>
                        <NavLink to="/policies" className="hover:text-accent transition-colors duration-200">Cookies</NavLink>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                        <NavLink to="/" className="hover:text-accent transition-colors duration-200 text-lg"><FaFacebook /></NavLink>
                        <NavLink to="/" className="hover:text-accent transition-colors duration-200 text-lg"><FaInstagram /></NavLink>
                        <NavLink to="/" className="hover:text-accent transition-colors duration-200 text-lg"><FaYoutube /></NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
