import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../resources/server-API";
import {
    Activity,
    DollarSign,
    Users,
    Map
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Dashboard() {
    const [tours, setTours] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Admin token missing. Please log in again.");
                setLoading(false);
                navigate("/login");
                return;
            }

            setError("");
            const headers = { Authorization: `Bearer ${token}` };

            try {
                const toursRes = await axios.get(`${HOST}/tours`, { headers });
                const bookingsRes = await axios.get(`${HOST}/bookings`, { headers });

                if (toursRes.data?.status) {
                    setTours(toursRes.data.tours || toursRes.data.data || []);
                } else if (toursRes.data?.tours) {
                    setTours(toursRes.data.tours);
                } else {
                    setError(toursRes.data?.message || "Unable to load tours.");
                }

                if (bookingsRes.data?.success) {
                    setBookings(bookingsRes.data.data || []);
                } else {
                    setError(bookingsRes.data?.message || "Unable to load bookings.");
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);

                if (axios.isAxiosError(err) && err.response) {
                    if (err.response.status === 401) {
                        setError("Session expired or invalid token. Please log in again.");
                        navigate("/login");
                        return;
                    }
                    setError(err.response.data?.message || "Unable to load dashboard data. Please try again.");
                } else {
                    setError("Unable to load dashboard data. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const totalRevenue = bookings.reduce((acc, curr) => {
        const price = typeof curr.price === 'string' ? parseFloat(curr.price.replace(/[^0-9.-]+/g, "")) : curr.price;
        return acc + (curr.status !== 'cancelled' ? (price || 0) : 0);
    }, 0);

    const activeTours = tours.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const totalBookings = bookings.length;
    const recentBookings = [...bookings].reverse().slice(0, 5);

    const stats = [
        {
            title: "Total Bookings",
            value: `${totalBookings}`,
            hint: "All time bookings",
            icon: Users,
        },
        {
            title: "Active Tours",
            value: `${activeTours}`,
            hint: "Currently available packages",
            icon: Map,
        },
        {
            title: "Total Revenue",
            value: `PKR ${totalRevenue.toLocaleString()}`,
            hint: "Confirmed bookings only",
            icon: DollarSign,
        },
        {
            title: "Pending Requests",
            value: `${pendingBookings}`,
            hint: "Requires attention",
            icon: Activity,
        },
    ];

    if (loading) {
        return <div className="p-8">Loading dashboard data...</div>;
    }

    return (
        <div className="space-y-8">
            <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-lg">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm uppercase tracking-[0.32em] text-emerald-600 font-semibold">Welcome back</p>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Admin dashboard</h1>
                        <p className="mt-3 text-slate-600">Monitor tours, bookings, and user activity from one polished admin portal.</p>
                    </div>
                    <div className="grid w-full max-w-sm gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
                            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Bookings</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-950">{totalBookings}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
                            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Revenue</p>
                            <p className="mt-2 text-2xl font-semibold text-emerald-700">PKR {totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </section>

            {error && (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700">
                    {error}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                        <CardHeader className="flex items-start justify-between gap-4 px-6 pt-6 pb-2">
                            <div>
                                <CardTitle className="text-sm font-semibold text-slate-900">{stat.title}</CardTitle>
                                <p className="mt-2 text-sm text-slate-500">{stat.hint}</p>
                            </div>
                            <stat.icon className="h-5 w-5 text-emerald-600" />
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2">
                            <div className="text-3xl font-bold text-slate-950">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <Card className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle>Revenue overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[240px] rounded-[1.25rem] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                            Chart placeholder for future analytics
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent bookings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {recentBookings.length === 0 ? (
                            <p className="text-sm text-slate-500">No bookings found yet.</p>
                        ) : (
                            recentBookings.map((booking, i) => (
                                <div key={i} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-slate-950">{booking.tourName}</p>
                                            <p className="text-sm text-slate-600">{booking.userId?.email || "Guest"}</p>
                                        </div>
                                        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{booking.status}</p>
                                    </div>
                                    <p className="mt-2 text-sm text-slate-500">{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Just now'}</p>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
