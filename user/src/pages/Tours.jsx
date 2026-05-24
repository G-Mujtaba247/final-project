import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(GET_TOURS);
        if (response.data.status) {
          setTours(response.data.tours || []);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
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

        {tours.filter(tour => tour.status === 'upcoming' || tour.status === 'available').length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.filter(tour => tour.status === 'upcoming' || tour.status === 'available').map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No upcoming tours available at the moment.</p>
            <p className="text-gray-400 mt-2">Please check back later for exciting new destinations.</p>
          </div>
        )}
      </section>

      {/* ---------- RECENT TOURS ---------- */}
      <section>
        <h2 className="text-4xl font-bold mb-4 text-center">Recent Tours</h2>
        <p className="text-center text-gray-600 mb-10">
          Explore our recently completed adventures and plan your next trip.
        </p>

        {tours.filter(tour => tour.status === 'recent').length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.filter(tour => tour.status === 'recent').map(tour => (
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
