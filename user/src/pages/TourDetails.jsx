import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router";
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  ArrowLeft,
  ArrowUpRight,
  Users,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import WebLayout from "../layout/WebLayout";
import { getTourBySlug } from "../data/tours";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const statusStyles = {
  available: "bg-secondary text-white",
  upcoming: "bg-accent text-accent-foreground",
  recent: "bg-primary text-primary-foreground",
};

const TourDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get tour from route state first, then fall back to data lookup
  const tour = location.state?.tour || getTourBySlug(slug);

  if (!tour) {
    return (
      <WebLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-28 pb-16 px-4">
          <div className="text-center space-y-4">
            <p className="text-6xl">🏔️</p>
            <h1 className="text-3xl font-bold text-primary">Tour Not Found</h1>
            <p className="text-slate-600 max-w-md">
              The tour you're looking for doesn't exist or may have been removed.
            </p>
          </div>
          <Button
            onClick={() => navigate("/tours")}
            className="bg-primary hover:bg-secondary text-white rounded-2xl px-8 py-3 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tours
          </Button>
        </div>
      </WebLayout>
    );
  }

  const isBookable = tour.status === "available";
  const isUpcoming = tour.status === "upcoming";
  const isRecent = tour.status === "recent";

  const handleBookTour = () => {
    navigate("/booktour", {
      state: {
        id: tour._id || tour.id,
        title: tour.title,
        price: tour.price,
        startDate: tour.startDate,
        endDate: tour.endDate,
      },
    });
  };

  const getImageUrl = (image) => {
    if (!image) return "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800";
    if (/^https?:\/\//.test(image)) return image;
    if (image.startsWith("/")) return image;
    return `/${image}`;
  };

  return (
    <WebLayout>
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/tours" className="hover:text-primary transition-colors">Tours</Link>
            <span>/</span>
            <span className="text-primary font-medium truncate max-w-48">{tour.title}</span>
          </nav>

          {/* Hero section */}
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <AspectRatio ratio={16 / 10}>
                <img
                  src={getImageUrl(tour.image)}
                  alt={tour.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800";
                  }}
                />
              </AspectRatio>

              {/* Status badge on image */}
              <div className="absolute top-5 left-5 z-10">
                <Badge
                  className={`px-4 py-1.5 font-semibold text-sm tracking-wider rounded-xl border-0 shadow-lg ${
                    statusStyles[tour.status] || statusStyles.available
                  }`}
                >
                  {(tour.status || "available").toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight leading-tight">
                  {tour.title}
                </h1>
                {tour.location && (
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-3">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>{tour.location}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-accent/15 px-3 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-bold text-primary">{tour.rating || 4.8}</span>
                </div>
                <span className="text-xs text-slate-500">Traveller rating</span>
              </div>

              <Separator />

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    <span className="uppercase tracking-wider font-semibold">Duration</span>
                  </div>
                  <p className="font-bold text-primary text-sm">{tour.duration || "4-7 Days"}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Users className="w-3.5 h-3.5 text-secondary" />
                    <span className="uppercase tracking-wider font-semibold">Group Size</span>
                  </div>
                  <p className="font-bold text-primary text-sm">8–15 People</p>
                </div>
                {tour.startDate && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                      <Calendar className="w-3.5 h-3.5 text-secondary" />
                      <span className="uppercase tracking-wider font-semibold">Start Date</span>
                    </div>
                    <p className="font-bold text-primary text-sm">{formatDate(tour.startDate)}</p>
                  </div>
                )}
                {tour.endDate && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                      <Calendar className="w-3.5 h-3.5 text-secondary" />
                      <span className="uppercase tracking-wider font-semibold">End Date</span>
                    </div>
                    <p className="font-bold text-primary text-sm">{formatDate(tour.endDate)}</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Price */}
              <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Price per person</p>
                <p className="text-3xl font-extrabold text-primary mt-1">
                  <span className="text-sm font-medium text-slate-500 mr-1">PKR</span>
                  {tour.price ? Number(tour.price).toLocaleString() : "Contact Us"}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                {(isBookable || isUpcoming) && (
                  <Button
                    onClick={handleBookTour}
                    className="flex-1 bg-primary hover:bg-secondary text-white h-14 rounded-2xl font-semibold text-base transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isUpcoming ? "Pre-Book Now" : "Book This Tour"}
                    <ArrowUpRight className="w-5 h-5" />
                  </Button>
                )}
                {isRecent && (
                  <div className="flex-1 bg-slate-100 h-14 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 text-slate-500 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4" />
                    Tour Completed
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={() => navigate("/tours")}
                  className="h-14 rounded-2xl font-semibold border-primary/20 text-primary hover:bg-primary hover:text-white px-6 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  All Tours
                </Button>
              </div>
            </div>
          </div>

          {/* Description section */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">About This Tour</h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {tour.description ||
                  "Embark on an unforgettable adventure through Pakistan's scenic high country, guided by industry veterans with premium stayovers."}
              </p>

              {/* Highlights */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-primary mb-4">Tour Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Professional tour guide included",
                    "Comfortable transport throughout",
                    "Authentic local cuisine & meals",
                    "Scenic photography stops",
                    "Cultural & heritage experiences",
                    "24/7 support during the trip",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust / Info card */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-secondary" />
                  <h3 className="font-bold text-primary">Booking Guarantee</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>Free cancellation up to 48 hours before departure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>Secure online payment options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>Licensed & insured tour operators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>Small group sizes for personal experience</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-primary/5 border border-primary/10 p-6">
                <p className="font-semibold text-primary">Need a custom itinerary?</p>
                <p className="mt-2 text-sm text-slate-600">
                  Our travel experts can tailor this tour to match your preferred dates, group size, or budget.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/contact")}
                  className="mt-4 rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white cursor-pointer"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default TourDetails;
