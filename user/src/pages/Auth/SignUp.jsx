import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { HOST } from "../../resources/server-API";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      const res = await axios.post(`${HOST}/user/register`, payload);

      if (res.data.status) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white overflow-hidden">
      {/* LEFT: Form Section */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="absolute top-6 left-6 flex items-center gap-2">
           <Link to="/" className="text-green-700 hover:text-green-800 flex items-center gap-2 font-semibold">
              <ArrowLeft size={20} /> Back to Home
           </Link>
        </div>

        <div className="w-full max-w-sm mt-10">
          <div className="text-left mb-6">
            <h2 className="text-[28px] font-bold text-green-700 mb-1">
              Create an account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">FULL NAME (پورا نام) <span className="text-red-500">*</span></label>
              <div className="relative flex">
                <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pr-4 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">EMAIL (ای میل) <span className="text-red-500">*</span></label>
              <div className="relative flex">
                <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pr-4 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">PASSWORD (پاس ورڈ) <span className="text-red-500">*</span></label>
              <div className="relative flex">
                <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                  <Lock className="h-5 w-5 text-green-600" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pr-10 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">CONFIRM PASSWORD (پاس ورڈ کی تصدیق کریں) <span className="text-red-500">*</span></label>
              <div className="relative flex">
                <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                  <Lock className="h-5 w-5 text-green-600" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pr-10 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#009b4d] hover:bg-[#008040] text-white font-semibold py-3 rounded-md transition duration-200 mt-6 shadow-sm"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up (رجسٹر کریں)"}
            </button>
          </form>

          <div className="mt-8 border-dashed border-2 border-green-500 rounded-lg p-4 text-center bg-transparent">
            <p className="text-[13px] font-bold text-gray-800">
              Already have an account? <Link to="/login" className="text-green-600 hover:underline ml-1">LOGIN NOW</Link>
            </p>
            <p className="text-xs text-green-700 mt-1 font-semibold">(کیا آپ کا اکاؤنٹ ہے؟ ابھی لاگ ان کریں)</p>
          </div>

        </div>
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs text-gray-700 font-medium whitespace-nowrap">
             <p>Powered By: Explore Pakistan Team</p>
        </div>
      </div>

      {/* RIGHT: Image Section (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#00a300] rounded-l-[50px] shadow-2xl">
        <img
          src="/image1.jpg"
          alt="Pakistan Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#004d00]/70 to-[#00cc00]/30 z-10" />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-end text-right p-12 lg:p-20 text-white">
          <h1 className="text-5xl lg:text-[64px] font-extrabold mb-2 leading-tight tracking-tight drop-shadow-lg">
            EXPLORE PAKISTAN
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white drop-shadow-md tracking-wider">
            DISCOVER THE BEAUTY
          </h2>
          <div className="flex justify-end w-full">
            <div className="text-right">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-sm italic">Message from the Team</h3>
                <p className="text-[15px] leading-relaxed text-white max-w-[500px] inline-block font-medium drop-shadow-sm mb-4">
                "It gives us immense pleasure to welcome you to Explore Pakistan. Our mission is simple yet profound: to make the breathtaking landscapes and rich culture of Pakistan accessible to everyone while promoting safe and sustainable tourism."
                </p>
                <div className="flex justify-end">
                    <button className="bg-white text-green-800 text-sm font-bold py-2 px-6 rounded hover:bg-green-100 transition shadow-md">
                    Read more
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
