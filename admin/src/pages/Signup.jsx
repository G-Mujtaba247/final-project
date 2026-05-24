import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { HOST } from "@/resources/server-API"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!name || !email || !password) {
            setError("Please fill in all fields.")
            return
        }

        setIsLoading(true)
        try {
            const res = await axios.post(`${HOST}/user/register`, {
                name,
                email,
                password,
            })

            if (res.data.status) {
                alert("Signup successful! Please login.")
                navigate("/login")
            } else {
                setError(res.data.message || "Registration failed.")
            }
        } catch (err) {
            console.error("Admin signup error:", err)
            setError("Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),transparent_45%)] flex items-center justify-center px-4 py-12">
            <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl sm:grid-cols-2">
                <div className="hidden flex-col justify-between bg-slate-950 p-10 text-white sm:flex">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-emerald-400 font-semibold">Create admin account</p>
                        <h2 className="mt-6 text-3xl font-semibold tracking-tight">Join Explore Admin</h2>
                        <p className="mt-4 text-slate-300">Get access to all management tools for tours, bookings, and website content.</p>
                    </div>
                    <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6">
                        <p className="text-xs uppercase tracking-[0.32em] text-emerald-200">New account perks</p>
                        <ul className="mt-4 space-y-3 text-sm text-slate-300">
                            <li>• One place to manage bookings</li>
                            <li>• Easy content updates</li>
                            <li>• Secure access controls</li>
                        </ul>
                    </div>
                </div>

                <div className="p-8 sm:p-10">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Create account</h1>
                            <p className="text-sm text-slate-500">Register an admin account for the portal.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            {error && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                            <Card className="rounded-[1.75rem] border border-slate-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg">Signing up</CardTitle>
                                    <CardDescription>Create your admin credentials below.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Max Robinson"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <Button className="w-full" type="submit">Create an account</Button>
                        </form>
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
