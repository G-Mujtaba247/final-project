import React from 'react';
import { ArrowRight, ShieldCheck, BadgeDollarSign, Telescope } from 'lucide-react';

const benefitsData = [
    {
        id: 1,
        label: "Affordable",
        title: "Best prices in the market",
        description: "Quality tours without breaking the bank. We believe great travel should be accessible to everyone.",
        image: "/Market.jpeg",
        icon: BadgeDollarSign,
        link: "#"
    },
    {
        id: 2,
        label: "Safe travels",
        title: "Your security is our priority",
        description: "Experienced guides and vetted accommodations ensure peace of mind on every journey.",
        image: "/Safety.webp",
        icon: ShieldCheck,
        link: "#"
    },
    {
        id: 3,
        label: "Expert guides",
        title: "Local knowledge and passion",
        description: "Our guides know these mountains like the back of their hand and love sharing their stories.",
        image: "/Guides.webp",
        icon: Telescope,
        link: "#"
    }
];

const BenefitCard = ({ benefit }) => {
    const Icon = benefit.icon;
    return (
        <div className="group bg-white rounded-3xl border border-slate-200/70 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            {/* Image with gradient overlay */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>

                {/* Floating Icon Badge */}
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-accent/90 shadow-lg">
                        <Icon className="w-5 h-5 text-white" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/90 drop-shadow">{benefit.label}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-7">
                <h3 className="text-xl font-bold mb-3 leading-snug text-primary group-hover:text-secondary transition-colors duration-300">
                    {benefit.title}
                </h3>
                <p className="text-slate-600 mb-5 leading-relaxed text-sm">
                    {benefit.description}
                </p>
                <a
                    href={benefit.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors duration-200 group/link"
                >
                    Learn more
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>
            </div>
        </div>
    );
};

const Benefits = () => {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary mb-4 border border-secondary/20">
                    Why Choose Us
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary tracking-tight">
                    Why travel with us
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
                    We <span className="font-bold text-secondary">handle the details</span> so you can <span className="font-bold text-secondary">focus on the adventure</span>.
                </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefitsData.map(benefit => (
                    <BenefitCard key={benefit.id} benefit={benefit} />
                ))}
            </div>
        </section>
    );
};

export default Benefits;
