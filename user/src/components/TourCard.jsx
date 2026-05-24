import React from "react";
import { Star, MapPin, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { UPLOADS_HOST } from "../resources/server-API";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
};

const TourCard = ({ tour, onBookTour }) => {
  const isUpcoming = tour.status === "upcoming" || tour.status === "available";

  const getTourImageUrl = (image) => {
    if (!image) return "/placeholder-tour.jpg";
    if (/^https?:\/\//.test(image)) return image;
    if (image.startsWith("/uploads/")) return `${UPLOADS_HOST}${image.replace("/uploads", "")}`;
    if (image.startsWith("uploads/")) return `${UPLOADS_HOST}/${image.replace("uploads/", "")}`;
    if (image.startsWith("/")) return `${UPLOADS_HOST}${image}`;
    return `${UPLOADS_HOST}/${image.replace(/^\/+/, "")}`;
  };

  return (
    <Card className="group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200/60 dark:border-slate-800 rounded-3xl h-full flex flex-col bg-white/90 backdrop-blur-sm transform hover:-translate-y-2">
      {/* Aspect Ratio Media container with absolute tags */}
      <div className="relative overflow-hidden">
        <AspectRatio ratio={4 / 3}>
          <img
            src={getTourImageUrl(tour.image)}
            alt={tour.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600";
            }}
          />
        </AspectRatio>

        {/* Top Floating Badges */}
        <div className="absolute inset-x-0 top-4 px-4 flex justify-between items-center z-10">
          <Badge className={`px-3 py-1 font-semibold text-xs tracking-wider rounded-xl border-0 shadow-md ${
            isUpcoming ? 'bg-secondary text-white' : 'bg-primary text-slate-100'
          }`}>
            {tour.status ? tour.status.toUpperCase() : "AVAILABLE"}
          </Badge>
          
          {(tour.startDate || tour.endDate) && (
            <span className="rounded-xl bg-black/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-md border border-white/10 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {tour.startDate ? formatDate(tour.startDate) : "Anytime"}
            </span>
          )}
        </div>

        {/* Gradient shadow overlay for smooth text overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
      </div>

      {/* Main card info area */}
      <CardHeader className="space-y-3 px-6 pt-6 pb-0 flex-1">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-primary leading-tight line-clamp-1 group-hover:text-secondary transition-colors duration-300">
              {tour.title}
            </CardTitle>
            <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>Pakistan</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0 bg-accent/15 px-2.5 py-1 rounded-xl">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-xs font-bold text-primary">4.8</span>
          </div>
        </div>

        <CardDescription className="line-clamp-3 text-sm text-slate-600 leading-relaxed mt-2">
          {tour.description || "Embark on an unforgettable adventure through Pakistan's scenic high country, guided by industry veterans with premium stayovers."}
        </CardDescription>
      </CardHeader>

      {/* Dynamic pricing and CTA section */}
      <CardContent className="space-y-6 px-6 pb-6 pt-4 mt-auto">
        <div className="h-px bg-slate-200/60 w-full"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Price per person</p>
            <p className="text-2xl font-extrabold text-primary">
              <span className="text-xs font-medium text-slate-500 mr-0.5">PKR</span> 
              {tour.price ? Number(tour.price).toLocaleString() : "Contact Us"}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-background px-3.5 py-2 rounded-2xl border border-slate-200/50 font-medium">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>{tour.duration || "4-7 Days"}</span>
          </div>
        </div>

        <Button
          onClick={() => onBookTour(tour)}
          className="w-full bg-primary hover:bg-secondary text-white h-12 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer group/btn"
        >
          Book Adventure
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TourCard;
