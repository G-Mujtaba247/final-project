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
  const availableToursCount = tours.filter((tour) =>
    tour.status === "upcoming" || tour.status === "available"
  ).length;
  const recentToursCount = tours.filter((tour) => tour.status === "recent").length;

  const upcomingTours = filteredTours.filter(
    (tour) => tour.status === "upcoming" || tour.status === "available"
  );
  const recentTours = filteredTours.filter((tour) => tour.status === "recent");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(GET_TOURS);
        if (response.data.status && Array.isArray(response.data.tours)) {
          setTours(response.data.tours);
        } else {
          setError(response.data.message || "Tours could not be loaded.");
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
        setError("Tours could not be loaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);




  if (loading) {
    return (
      <WebLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-lg text-muted-foreground">Loading tours...</div>
        </div>
      </WebLayout>
    );
  }

  return (
    <>
    <WebLayout>
    <div className="max-w-7xl mx-auto space-y-12 pt-16 pb-16 mt-10">

      {/* ---------- UPCOMING TOURS ---------- */}
      <section>
        <h2 className="text-4xl font-bold mb-4 text-center">Available Tours</h2>
        <p className="text-center text-gray-600 mb-10">
          Discover amazing destinations and book your next adventure with us.
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total tours</p>
              <p className="mt-3 text-4xl font-semibold text-primary">{totalTours}</p>
              <p className="mt-2 text-sm text-slate-500">Browse all packages currently available for booking.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Available now</p>
              <p className="mt-3 text-4xl font-semibold text-secondary">{availableToursCount}</p>
              <p className="mt-2 text-sm text-slate-500">Upcoming and available departures ready for reservation.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent trips</p>
              <p className="mt-3 text-4xl font-semibold text-primary">{recentToursCount}</p>
              <p className="mt-2 text-sm text-slate-500">Completed journeys our travelers loved.</p>
            </div>
          </div>
        </div>

        {upcomingTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingTours.map((tour) => (
              <TourCard
                key={tour._id}
                tour={tour}
                onBookTour={(selectedTour) =>
                  navigate("/booktour", {
                    state: {
                      id: selectedTour._id,
                      title: selectedTour.title,
                      price: selectedTour.price,
                      startDate: selectedTour.startDate,
                      endDate: selectedTour.endDate,
                    },
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No upcoming tours match your filters.</p>
            <p className="text-gray-400 mt-2">Try adjusting the search or status options above.</p>
          </div>
        )}
      </section>

      {/* ---------- RECENT TOURS ---------- */}
      <section>
        <h2 className="text-4xl font-bold mb-4 text-center">Recent Tours</h2>
        <p className="text-center text-gray-600 mb-10">
          Explore our recently completed adventures and plan your next trip.
        </p>

        {recentTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recent tours available at the moment.</p>
            <p className="text-gray-400 mt-2">Check out our available tours instead.</p>
          </div>
        )}
      </section>

    </div>
    </WebLayout>
    </>
  );
};

export default Tour;
