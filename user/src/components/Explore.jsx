import React from "react";
import { ArrowRight, Box } from "lucide-react";
import TravelDeals from "../components/TravelDeals";

const toursData = [
  { id: 1, title: "Mountain escape near Islamabad", subtitle: "Murree", description: "Cool pine forests and scenic views await in this hill station.", image: "/image1.jpg", height: "h-64 md:h-80 lg:h-[550px]", column: 1 },
  { id: 2, title: "Swat Valley adventure", subtitle: "Swat Valley", description: "Pristine valleys and river trails. Discover emerald waters and ancient culture in this northern gem.", image: "/Sawat.jpg", height: "h-48 md:h-64 lg:h-[400px]", column: 1 },

  { id: 3, title: "Explore", subtitle: "Naran Kaghan lakes", description: "Alpine lakes and mountain peaks", image: "/image2.avif", height: "h-48 md:h-64 lg:h-[400px]", column: 2 },
  { id: 4, title: "Explore", subtitle: "Chitral", description: "Crystal clear waters surrounded by towering peaks and dense forests. Remote mountain wilderness", image: "/Chitral.jpg", height: "h-64 md:h-80 lg:h-[550px]", column: 2 },

  { id: 5, title: "Explore", subtitle: "Lahore heritage tour", description: "Experience untouched valleys and traditional culture in this frontier region. Historic cities and monuments", image: "/Lahore.jpg", height: "h-64 md:h-80 lg:h-[550px]", column: 3 },
  { id: 6, title: "Walk through centuries of history in Pakistan's cultural heart.", subtitle: "Multan spiritual journey", description: "Explore", image: "/Multan.jpg", height: "h-48 md:h-64 lg:h-[400px]", column: 3 }
];

// Reusable card component
const TourCard = ({ tour }) => {
  return (
    <div className={`relative group overflow-hidden rounded-3xl ${tour.height} w-full shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl`}>
      <img
        src={tour.image}
        alt={tour.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-95 group-hover:opacity-90 transition-all" />

      <div className="absolute inset-0 p-5 md:p-6 lg:p-8 flex flex-col justify-end text-white">
        <div className="mb-4 flex items-center justify-between gap-3">
          {tour.subtitle && <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/80">{tour.subtitle}</span>}
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/80">Popular</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">{tour.title}</h3>
          <p className="text-sm md:text-base text-white/90 line-clamp-3">{tour.description}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">Best Seller</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">3-7 days</span>
        </div>
      </div>
    </div>
  );
};

const Explore = () => {
  const columns = [1, 2, 3].map(col => toursData.filter(tour => tour.column === col));

  return (
    <>
      <section className="py-16 px-4 max-w-7xl mt-10 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-wider mb-2">Featured</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular tours this season</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked destinations across Pakistan's most stunning landscapes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col, index) => (
            <div key={index} className="flex flex-col gap-6">
              {col.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Explore;
