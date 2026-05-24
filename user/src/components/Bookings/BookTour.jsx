import React from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { CREATE_BOOKING } from "../../resources/server-API";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const BookTour = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, title, price } = location.state || {};

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    bookingDate: "",
    numberOfPeople: 1,
    message: ""
  });
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState({ type: "", text: "" });

  const minDate = React.useMemo(() => new Date().toISOString().split("T")[0], []);
  const numericPrice = React.useMemo(() => {
    const cleaned = String(price || "").replace(/[^\d.]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }, [price]);

  const totalEstimate = React.useMemo(() => {
    if (numericPrice) {
      return `PKR ${Math.round(numericPrice * formData.numberOfPeople).toLocaleString()}`;
    }
    if (price) {
      return `${price} × ${formData.numberOfPeople}`;
    }
    return "TBD";
  }, [numericPrice, price, formData.numberOfPeople]);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const [first, ...rest] = (user.name || "").split(" ");
      setFormData(prev => ({
        ...prev,
        firstName: first || "",
        lastName: rest.join(" ") || "",
        email: user.email || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token");

    // Validation checks
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.bookingDate) {
      setStatus({ type: "error", text: "Please fill in all required fields before submitting." });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        tourId: id,
        tourName: title,
        price: numericPrice ?? Number(String(price || "").replace(/[^\d.]/g, "")),
        bookingDate: formData.bookingDate,
        numberOfPeople: formData.numberOfPeople,
        message: formData.message
      };

      // Make the request with explicit configuration
      const config = {
        timeout: 15000, // 15 second timeout
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        validateStatus: function (status) {
          // Don't reject on any status code, handle all responses
          return true;
        }
      };

      const res = await axios.post(CREATE_BOOKING, payload, config);

      console.log("Booking response status:", res.status);
      console.log("Booking response data:", res.data);

      if (res.status === 200 && res.data?.status) {
        setStatus({ type: "success", text: "Booking submitted successfully! We will contact you shortly." });
        // Reset form
        setFormData({
          firstName: user?.name?.split(" ")[0] || "",
          lastName: user?.name?.split(" ").slice(1).join(" ") || "",
          phone: "",
          email: user?.email || "",
          bookingDate: "",
          numberOfPeople: 1,
          message: ""
        });
        setTimeout(() => navigate("/booking"), 1200);
      } else if (res.data?.status === false) {
        setStatus({ type: "error", text: `Booking failed: ${res.data?.message || "Please try again."}` });
      } else {
        setStatus({ type: "error", text: `Unexpected response: ${res.data?.message || "Please try again."}` });
      }
    } catch (err) {
      console.error("Booking error details:", {
        message: err.message,
        code: err.code,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          headers: err.config?.headers
        },
        fullError: err
      });
      
      // Extract error message from different error scenarios
      let errorMessage = "Error submitting booking. Please try again in moments.";
      
      // Priority 1: Server response with error data
      if (err.response?.data?.message) {
        errorMessage = `Server says: ${err.response.data.message}`;
      } 
      // Priority 2: Specific HTTP error codes
      else if (err.response?.status === 400) {
        errorMessage = `Invalid Input: ${err.response.data?.message || "Please check all required fields and valid data formats."}`;
      } 
      else if (err.response?.status === 500) {
        errorMessage = `Server Error: ${err.response.data?.message || "The server encountered an error. Please try again later."}`;
      } 
      // Priority 3: Network/connection errors
      else if (err.code === 'ECONNREFUSED') {
        errorMessage = `Server Offline: Cannot connect to the server at ${CREATE_BOOKING}. Is the server running on port 5000?`;
      }
      else if (err.code === 'ENOTFOUND') {
        errorMessage = `Server Not Found: Cannot resolve the server address. Check your internet connection.`;
      }
      else if (err.code === 'ERR_NETWORK') {
        errorMessage = `Network Error: Cannot reach the server. Please check your internet connection.`;
      } 
      else if (err.code === 'ECONNABORTED') {
        errorMessage = `Request Timeout: The server took too long to respond. Please try again or check your connection.`;
      } 
      else if (!err.response && err.request) {
        errorMessage = `No Response: Sent request to the server but received no response. The server might be down.`;
      }
      else if (err.message === 'Network Error') {
        errorMessage = `Network Error: Please check your internet connection and try again.`;
      }
      
      setStatus({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),transparent_40%),radial-gradient(circle_at_bottom,_rgba(20,184,166,0.08),transparent_38%)] pt-28 pb-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600 font-semibold">Fast, easy, secure</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-950">Book Your Next Pakistan Escape</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">We prefill your details and keep everything simple so you can reserve your tour in just a few clicks.</p>
        </div>

        <Card className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
            <div className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="space-y-3">
                  <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Booking form</div>
                  <div>
                    <h2 className="text-3xl font-semibold text-slate-950">Complete your reservation</h2>
                    <p className="mt-2 text-sm text-slate-600">All fields marked with * are required.</p>
                  </div>
                </div>
              </CardHeader>

              {status.text && (
                <div
                  role="status"
                  className={`mb-6 rounded-3xl border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <CardContent className="space-y-6 p-0">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>First Name <span className="text-red-500">*</span></Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name <span className="text-red-500">*</span></Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92xxxxxxxxxx"
                        type="tel"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Selected Tour</Label>
                      <Input value={title || "No tour selected"} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Expense (Per Person)</Label>
                      <Input value={price || "N/A"} disabled />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Preferred Date <span className="text-red-500">*</span></Label>
                      <Input
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                        type="date"
                        min={minDate}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Number of People</Label>
                      <Input
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        type="number"
                        min="1"
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Message (optional)</Label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requests or notes"
                      rows={4}
                    />
                  </div>
                </CardContent>

                <CardFooter className="p-0 mt-4">
                  <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {loading ? "Booking..." : "Confirm Booking"}
                  </Button>
                </CardFooter>
              </form>
            </div>

            <aside className="bg-slate-50 p-6">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Booking summary</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">Tour details</h3>
                </div>
                <div className="space-y-4 text-sm text-slate-700">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Tour</p>
                    <p className="mt-2 font-semibold text-slate-900">{title || "No tour selected"}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Price per person</p>
                    <p className="mt-2 font-semibold text-slate-900">{price || "TBD"}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">People</p>
                    <p className="mt-2 font-semibold text-slate-900">{formData.numberOfPeople}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Estimated total</p>
                    <p className="mt-2 text-xl font-semibold text-emerald-700">{totalEstimate}</p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-800">
                  <p className="font-semibold">Need help?</p>
                  <p className="mt-2 text-slate-600">If you want a custom date or group discount, visit our contact page or message support after booking.</p>
                </div>
              </div>
            </aside>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookTour;
