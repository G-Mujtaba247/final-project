import { Button } from "./ui/button";
import { Mail, ShieldCheck } from "lucide-react";

export default function TravelDeals() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-emerald-950 p-8 md:p-16 relative overflow-hidden shadow-2xl border border-white/5">

        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-secondary/15 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent border border-white/10 backdrop-blur-md mb-6">
            Exclusive Deals
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Get travel deals directly <br className="hidden md:block" /> in your inbox
          </h2>

          {/* Sub-text */}
          <p className="text-slate-300 mt-4 max-w-xl text-sm md:text-base leading-relaxed">
            Join 5,000+ explorers who receive handpicked tours, off-the-beaten-path guides, and exclusive seasonal travel discounts across Pakistan.
          </p>

          {/* Email Subscription Box */}
          <form className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full max-w-xl bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 flex-1 w-full px-3 py-2">
              <Mail className="text-accent w-5 h-5 shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent text-white placeholder-slate-400 outline-none text-sm border-0 focus:ring-0"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-secondary text-white hover:bg-secondary/90 px-8 py-3.5 rounded-xl font-bold transition-all shadow-md w-full sm:w-auto shrink-0 cursor-pointer"
            >
              Subscribe
            </Button>
          </form>

          {/* Trust indicators */}
          <div className="flex items-center gap-2 mt-6 text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Zero Spam. Unsubscribe at any time. Read our <a href="/policies" className="underline hover:text-white transition-colors">Privacy Policy</a>.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
