import React from 'react';
import { Button } from "./ui/button";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from 'react-router';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-primary text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    <div className="space-y-5 md:col-span-4">
                        <div className="flex items-center gap-3">
                            <img src="logo.png" alt="Explore Pakistan logo" className='h-12 w-12 rounded-full object-cover md:h-14 md:w-14'
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div>
                                <p className="text-lg font-extrabold uppercase tracking-[0.2em] text-white">Explore Pakistan</p>
                                <p className="text-xs font-medium text-slate-300">Travel simplified.</p>
                            </div>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-slate-300">
                            Your gateway to Pakistan’s breathtaking landscapes, heritage sites, and unforgettable cultural experiences.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                                <span>Islamabad, Pakistan</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Mail className="h-3.5 w-3.5 shrink-0 text-accent" />
                                <span>hello@explorepakistan.pk</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
                                <span>+92 300 1234567</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-5">
                        <div>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li><NavLink to="/" className="transition-colors duration-200 hover:text-accent">Home</NavLink></li>
                                <li><NavLink to="/tours" className="transition-colors duration-200 hover:text-accent">Tours</NavLink></li>
                                <li><NavLink to="/about" className="transition-colors duration-200 hover:text-accent">About</NavLink></li>
                                <li><NavLink to="/contact" className="transition-colors duration-200 hover:text-accent">Contact</NavLink></li>
                                <li><NavLink to="/booking" className="transition-colors duration-200 hover:text-accent">Bookings</NavLink></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Company</h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li><NavLink to="/tours" className="transition-colors duration-200 hover:text-accent">Tours</NavLink></li>
                                <li><NavLink to="/about" className="transition-colors duration-200 hover:text-accent">Story</NavLink></li>
                                <li><NavLink to="/faq" className="transition-colors duration-200 hover:text-accent">FAQ</NavLink></li>
                                <li><NavLink to="/contact" className="transition-colors duration-200 hover:text-accent">Support</NavLink></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Help</h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li><NavLink to="/faq" className="transition-colors duration-200 hover:text-accent">FAQ</NavLink></li>
                                <li><NavLink to="/contact" className="transition-colors duration-200 hover:text-accent">Contact</NavLink></li>
                                <li><NavLink to="/policies" className="transition-colors duration-200 hover:text-accent">Policies</NavLink></li>
                                <li><NavLink to="/terms" className="transition-colors duration-200 hover:text-accent">Terms</NavLink></li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Newsletter</h3>
                        <p className="mb-5 text-xs leading-relaxed text-slate-300">Get the latest tour updates and travel advice delivered to your inbox.</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                                />
                                <Button className="shrink-0 rounded-xl bg-secondary px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-secondary/90">
                                    Go
                                </Button>
                            </div>
                            <p className="text-[10px] leading-tight text-slate-400">By subscribing you agree to our Privacy Policy.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-xs text-slate-400 md:flex-row md:px-10">
                    <p>© 2025 Explore Pakistan. All rights reserved.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        <NavLink to="/policies" className="transition-colors duration-200 hover:text-accent">Privacy Policy</NavLink>
                        <NavLink to="/terms" className="transition-colors duration-200 hover:text-accent">Terms of Service</NavLink>
                        <NavLink to="/faq" className="transition-colors duration-200 hover:text-accent">FAQ</NavLink>
                    </div>
                    <div className="flex items-center gap-4 text-lg text-slate-300">
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-accent" aria-label="Facebook"><FaFacebook /></a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-accent" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-accent" aria-label="YouTube"><FaYoutube /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
