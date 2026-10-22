import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, KeyRound } from "lucide-react";
import { HOST } from "../../resources/server-API";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${HOST}/user/send-otp`, { email });
      if (res.data.status) {
        setMessage(res.data.message);
        setStep(2);
      } else {
        setError(res.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Failed to send password reset OTP:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${HOST}/user/verify-otp`, { email, otp });
      if (res.data.status) {
        setMessage("OTP verified successfully!");
        setStep(3);
      } else {
        setError(res.data.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Failed to verify password reset OTP:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setError("Passwords do not match or are empty.");
      return;
    }
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${HOST}/user/reset-password`, { email, newPassword });
      if (res.data.status) {
        alert("Password reset successfully! Please login with your new password.");
        navigate("/login");
      } else {
        setError(res.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white overflow-hidden">
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="absolute top-6 left-6 flex items-center gap-2">
           <Link to="/login" className="text-green-700 hover:text-green-800 flex items-center gap-2 font-semibold">
              <ArrowLeft size={20} /> Back to Login
           </Link>
        </div>

        <div className="w-full max-w-sm mt-10">
          <div className="text-left mb-6">
            <h2 className="text-[28px] font-bold text-green-700 mb-1">
              Reset Password
            </h2>
            <p className="text-sm text-gray-500">
              {step === 1 && "Enter your email to receive a One-Time Password."}
              {step === 2 && "Enter the OTP sent to your email."}
              {step === 3 && "Create a new strong password."}
            </p>
          </div>

          <form className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                {message}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-1">
                <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">EMAIL <span className="text-red-500">*</span></label>
                <div className="relative flex">
                  <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pr-4 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full bg-[#009b4d] hover:bg-[#008040] text-white font-semibold py-3 rounded-md transition duration-200 mt-4 shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-1">
                <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">ENTER OTP <span className="text-red-500">*</span></label>
                <div className="relative flex">
                  <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                    <KeyRound className="h-5 w-5 text-green-600" />
                  </div>
                  <input
                    type="text"
                    placeholder="123456"
                    className="w-full pr-4 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50 tracking-widest font-bold text-center"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#009b4d] hover:bg-[#008040] text-white font-semibold py-3 rounded-md transition duration-200 mt-4 shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">NEW PASSWORD <span className="text-red-500">*</span></label>
                  <div className="relative flex">
                    <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                      <Lock className="h-5 w-5 text-green-600" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pr-4 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">CONFIRM PASSWORD <span className="text-red-500">*</span></label>
                  <div className="relative flex">
                    <div className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                      <Lock className="h-5 w-5 text-green-600" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pr-4 py-2.5 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-[#ebf5fb]/50"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="w-full bg-[#009b4d] hover:bg-[#008040] text-white font-semibold py-3 rounded-md transition duration-200 mt-4 shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}

          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#00a300] rounded-l-[50px] shadow-2xl">
        <img
          src="/image1.jpg"
          alt="Pakistan Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#004d00]/70 to-[#00cc00]/30 z-10" />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-end text-right p-12 lg:p-20 text-white">
          <h1 className="text-5xl lg:text-[64px] font-extrabold mb-2 leading-tight tracking-tight drop-shadow-lg">
            SECURE ACCOUNT
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white drop-shadow-md tracking-wider">
            RECOVER YOUR ACCESS
          </h2>
          <div className="flex justify-end w-full">
            <div className="text-right">
                <p className="text-[15px] leading-relaxed text-white max-w-[400px] inline-block font-medium drop-shadow-sm mb-4">
                "Don't worry if you forgot your password. We've got you covered. Just follow the simple steps to regain access to your Explore Pakistan account."
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
