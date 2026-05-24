import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    Calendar,
    Users,
    Menu,
    LogOut,
    LayoutTemplate,
    Settings,
    Search,
    Mountain
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tours', path: '/dashboard/tours', icon: Map },
    { name: 'Bookings', path: '/dashboard/bookings', icon: Calendar },
    { name: 'Users', path: '/dashboard/users', icon: Users },
    { name: 'Webpages', path: '/dashboard/cms', icon: LayoutTemplate },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

const Sidebar = ({ className, onClose, user, onLogout }) => {
    const location = useLocation();

    return (
        <div className={`flex flex-col h-full text-white ${className}`}
            style={{ background: 'linear-gradient(160deg, hsl(158,64%,10%) 0%, hsl(158,64%,13%) 60%, hsl(158,55%,18%) 100%)' }}
        >
            {/* Brand Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                        <Mountain className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h1 className="text-base font-extrabold tracking-wide text-white leading-tight">
                            Explore Pakistan
                        </h1>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Admin Portal</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1.5">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-white/12 text-white shadow-lg border border-white/10'
                                    : 'text-slate-400 hover:bg-white/8 hover:text-white border border-transparent'
                                }`}
                        >
                            <item.icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-accent' : 'text-slate-500 group-hover:text-slate-200'}`} />
                            <span className={`font-medium text-sm ${isActive ? 'text-white' : ''}`}>{item.name}</span>
                            {isActive && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"></span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/8">
                    <Avatar className="w-9 h-9 shrink-0">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-accent/20 text-accent text-sm font-bold">
                            {user?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name || "Admin"}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email || "admin@explore.pk"}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onLogout} title="Logout"
                        className="shrink-0 hover:bg-rose-500/20 hover:text-rose-400 transition-colors rounded-xl cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 text-slate-400" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function AdminLayout() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token) {
            navigate("/login");
        } else if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen text-foreground flex" style={{ background: 'hsl(40,20%,98%)' }}>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-68 fixed inset-y-0 z-50" style={{ width: '17rem' }}>
                <Sidebar user={user} onLogout={handleLogout} />
            </aside>

            {/* Mobile Sheet */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetContent side="left" className="p-0 w-72 border-0">
                    <Sidebar onClose={() => setIsMobileOpen(false)} user={user} onLogout={handleLogout} />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 md:ml-[17rem] flex flex-col min-h-screen transition-all duration-300">
                {/* Top Header */}
                <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden rounded-xl hover:bg-secondary/10 cursor-pointer"
                            onClick={() => setIsMobileOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <div className="flex-shrink-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">Management Portal</p>
                            <h2 className="text-base font-extrabold text-primary tracking-tight">Explore Pakistan</h2>
                        </div>
                        <div className="hidden sm:flex flex-1 max-w-md items-center gap-3 rounded-2xl border border-primary/10 bg-white px-4 py-2.5 shadow-sm ml-4">
                            <Search className="h-4 w-4 text-slate-400 shrink-0" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search tours, bookings, users..."
                                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="hidden sm:inline-flex ml-auto rounded-xl font-semibold border-primary/10 hover:bg-secondary/10 hover:text-primary transition-all cursor-pointer"
                            onClick={() => navigate('/dashboard/settings')}
                        >
                            <Settings className="w-4 h-4 mr-1.5" /> Settings
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6 md:p-8 pt-6 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
