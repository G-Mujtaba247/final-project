import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import axios from "axios";
import { HOST } from "../resources/server-API";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(`${HOST}/user/login`, formData);
            if (res.data.status) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.userToken);
                navigate("/dashboard");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Login failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),transparent_45%)] flex items-center justify-center px-4 py-12">
            <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl sm:grid-cols-2">
                <div className="hidden flex-col justify-between bg-slate-950 p-10 text-white sm:flex">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-emerald-400 font-semibold">Explore Admin</p>
                        <h2 className="mt-6 text-3xl font-semibold tracking-tight">Manage bookings, tours, and content with confidence.</h2>
                        <p className="mt-4 text-slate-300">Your control center for every part of the travel experience. Log in to keep packages up to date and monitor all activity from one place.</p>
                    </div>
                    <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 mt-10">
                        <p className="text-xs uppercase tracking-[0.32em] text-emerald-200">Quick access</p>
                        <ul className="mt-4 space-y-3 text-sm text-slate-300">
                            <li>• Manage tours and bookings</li>
                            <li>• Review user activity</li>
                            <li>• Edit site content fast</li>
                        </ul>
                    </div>
                </div>

                <div className="p-8 sm:p-10">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Admin sign in</h1>
                            <p className="text-sm text-slate-500">Enter your admin credentials to access the dashboard.</p>
                        </div>
                        <div className="grid gap-6">
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                className="pl-11"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="password"
                                                placeholder="Password"
                                                type={showPassword ? "text" : "password"}
                                                autoCapitalize="none"
                                                autoComplete="current-password"
                                                disabled={isLoading}
                                                className="pl-11 pr-11"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-2"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-slate-500" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-slate-500" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <Button disabled={isLoading} className="w-full">
                                        {isLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                            <p className="text-center text-sm text-slate-500">
                                New here? <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-700">Create an account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
