import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import WebLayout from "../layout/WebLayout";
import { GET_TOURS, UPLOADS_HOST } from "../resources/server-API";
import axios from "axios";
import { useNavigate } from "react-router";

import TourCard from "../components/TourCard";
import {
  toursData as localTours,
  getAvailableTours,
  getRecentTours,
  getUpcomingTours,
} from "../data/tours";

// ------------------ COMPONENT ------------------

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const filteredTours = React.useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return [...tours]
      .filter((tour) => {
        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "available" && tour.status === "available") ||
          (statusFilter === "upcoming" && tour.status === "upcoming") ||
          (statusFilter === "recent" && tour.status === "recent");

        const matchesSearch =
          normalizedQuery.length === 0 ||
          [tour.title, tour.description, tour.location, tour.status]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        }
        if (sortBy === "price-desc") {
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        }
        if (sortBy === "duration") {
          const parseDuration = (value) => {
            if (!value) return 0;
            const match = String(value).match(/\d+/);
            return match ? Number(match[0]) : 0;
          };
          return parseDuration(a.duration) - parseDuration(b.duration);
        }
        if (sortBy === "newest") {
          return new Date(b.startDate || 0) - new Date(a.startDate || 0);
        }
        return 0;
      });
  }, [tours, searchQuery, statusFilter, sortBy]);

  const totalTours = tours.length;
  const availableToursCount = tours.filter((tour) => tour.status === "available").length;
  const upcomingToursCount = tours.filter((tour) => tour.status === "upcoming").length;
  const recentToursCount = tours.filter((tour) => tour.status === "recent").length;

  const availableTours = filteredTours.filter((tour) => tour.status === "available");
  const upcomingTours = filteredTours.filter((tour) => tour.status === "upcoming");
  const recentTours = filteredTours.filter((tour) => tour.status === "recent");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(GET_TOURS);
        if (response.data.status && Array.isArray(response.data.tours) && response.data.tours.length > 0) {
          setTours(response.data.tours);
        } else {
          // API returned empty or unexpected — use local data
          setTours(localTours);
        }
      } catch {
        // Network error or server unreachable — use local data seamlessly
        setTours(localTours);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  /** Shared book-tour handler */
  const handleBookTour = (selectedTour) =>
    navigate("/booktour", {
      state: {
        id: selectedTour._id || selectedTour.id,
        title: selectedTour.title,
        price: selectedTour.price,
        startDate: selectedTour.startDate,
        endDate: selectedTour.endDate,
      },
    });

  /** Empty-state component for reuse across sections */
  const EmptySection = ({ message, sub }) => (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{message}</p>
      <p className="text-gray-400 mt-2">{sub}</p>
    </div>
  );

  if (loading) {
    return (
      <WebLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-secondary/30 border-t-secondary" />
            <p className="mt-4 animate-pulse text-lg text-muted-foreground">Loading tours...</p>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <>
    <WebLayout>
    <div className="max-w-7xl mx-auto space-y-16 pt-16 pb-16 mt-10 px-4">

      {/* ══════════════ HEADER & FILTERS ══════════════ */}
      <section>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center text-primary">
          Explore Our Tours
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover amazing destinations across Pakistan and book your next adventure with us.
        </p>
        {error && <p role="alert" className="mb-6 rounded-xl bg-rose-50 p-4 text-center text-rose-700">{error}</p>}

        <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr] mb-10">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-[1.8fr_1fr]">
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tours, destinations or keywords..."
                className="w-full"
              />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Shortest Duration</option>
                <option value="newest">Newest Start Date</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "All", value: "all" },
                { label: "Available", value: "available" },
                { label: "Upcoming", value: "upcoming" },
                { label: "Recent", value: "recent" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    statusFilter === option.value
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <span>
                Showing <strong>{filteredTours.length}</strong> matching tours from <strong>{totalTours}</strong> total.
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setSortBy("recommended");
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total tours</p>
              <p className="mt-3 text-4xl font-semibold text-primary">{totalTours}</p>
              <p className="mt-2 text-sm text-slate-500">Browse all packages currently listed.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Available now</p>
              <p className="mt-3 text-4xl font-semibold text-secondary">{availableToursCount}</p>
              <p className="mt-2 text-sm text-slate-500">Open for booking right now.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent trips</p>
              <p className="mt-3 text-4xl font-semibold text-primary">{recentToursCount}</p>
              <p className="mt-2 text-sm text-slate-500">Completed journeys our travelers loved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ AVAILABLE TOURS (4) ══════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Available Tours</h2>
          <Badge className="bg-secondary text-white border-0 px-3 py-1 text-xs tracking-wider rounded-xl shadow-sm">
            {availableTours.length}
          </Badge>
        </div>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Ready to book — pick your favourite destination and secure your spot today.
        </p>

        {availableTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableTours.map((tour) => (
              <TourCard
                key={tour._id || tour.id}
                tour={tour}
                onBookTour={handleBookTour}
              />
            ))}
          </div>
        ) : (
          <EmptySection
            message="No available tours match your filters."
            sub="Try adjusting the search or status options above."
          />
        )}
      </section>

      {/* ══════════════ UPCOMING TOURS (2) ══════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Upcoming Tours</h2>
          <Badge className="bg-accent text-accent-foreground border-0 px-3 py-1 text-xs tracking-wider rounded-xl shadow-sm">
            {upcomingTours.length}
          </Badge>
        </div>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Exciting adventures on the horizon — pre-book now to guarantee your seat.
        </p>

        {upcomingTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingTours.map((tour) => (
              <TourCard
                key={tour._id || tour.id}
                tour={tour}
                onBookTour={handleBookTour}
              />
            ))}
          </div>
        ) : (
          <EmptySection
            message="No upcoming tours at the moment."
            sub="Stay tuned — new tours are added regularly!"
          />
        )}
      </section>

      {/* ══════════════ RECENT TOURS (4) ══════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Recent Tours</h2>
          <Badge className="bg-primary text-primary-foreground border-0 px-3 py-1 text-xs tracking-wider rounded-xl shadow-sm">
            {recentTours.length}
          </Badge>
        </div>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Explore our recently completed adventures and get inspired for your next trip.
        </p>

        {recentTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTours.map((tour) => (
              <TourCard key={tour._id || tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <EmptySection
            message="No recent tours available at the moment."
            sub="Check out our available tours instead."
          />
        )}
      </section>

    </div>
    </WebLayout>
    </>
  );
};

export default Tour;
