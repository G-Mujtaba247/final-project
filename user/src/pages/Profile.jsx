import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOST } from "../resources/server-API";
import WebLayout from "../layout/WebLayout";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (userStr) {
          const userData = JSON.parse(userStr);
          setUser(userData);
          setProfileForm({ name: userData.name || "", email: userData.email || "" });
          
          if (token && userData._id) {
            const res = await axios.get(`${HOST}/booking/user/${userData._id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status && res.data.bookings) {
              setBookings(res.data.bookings);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${HOST}/user/profile`, profileForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status) {
        setMessage("Profile updated successfully.");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
      } else {
        setMessage(res.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <WebLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500/30 border-t-green-600" />
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout>
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-4">
            <div className="text-center md:text-left mb-6">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0 mb-3">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg font-bold text-slate-800">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
            
            <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 text-sm font-medium rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeTab === "bookings" ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 text-sm font-medium rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeTab === "profile" ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Profile Settings
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto">
            {activeTab === "bookings" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">My Bookings</h3>
                {bookings.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500">You haven't booked any tours yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-slate-800 text-lg">{booking.tourName || "Tour"}</h4>
                          <p className="text-sm text-slate-500">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                          <p className="text-sm text-slate-500">Guests: {booking.numberOfPeople}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {booking.status.toUpperCase()}
                          </span>
                          <p className="font-bold text-slate-800 mt-2">Rs. {Number(booking.price || 0).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Profile Settings</h3>
                {message && (
                  <div className={`p-3 text-sm rounded-md mb-6 ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {message}
                  </div>
                )}
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white mt-4" disabled={isUpdating}>
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </WebLayout>
  );
};

export default Profile;
