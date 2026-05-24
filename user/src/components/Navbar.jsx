import React, { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { GET_WEBPAGES } from "../resources/server-API";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name ? user.name.split(" ")[0] : null;
  const [dynamicPages, setDynamicPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get(GET_WEBPAGES);
        if (response.data.status) {
          // Filter out "Our Services" and "services" pages
          const filtered = response.data.webpages.filter(
            (page) => 
              page.slug !== "our-services" && 
              page.slug !== "services" && 
              !page.title.toLowerCase().includes("services")
          );
          setDynamicPages(filtered);
        }
      } catch (error) {
        console.error("Error fetching dynamic pages for Navbar:", error);
      }
    };
    fetchPages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 border-b border-primary/10 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="logo.png"
            alt="logo"
            className="w-10 h-10 md:w-12 md:h-12 hover:rotate-6 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=100";
            }}
          />
          <div className="hidden sm:block">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-primary">Explore Pakistan</p>
            <p className="text-[10px] text-slate-500 font-medium">Travel simplified.</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/tours", label: "Tours" },
              ].map((item) => (
                <NavigationMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) => cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10",
                      isActive ? "bg-secondary/15 text-primary font-bold shadow-sm" : "text-slate-600"
                    )}
                  >
                    {item.label}
                  </NavLink>
                </NavigationMenuItem>
              ))}

              {dynamicPages.map((page) => (
                <NavigationMenuItem key={page.slug}>
                  <NavLink
                    to={`/${page.slug}`}
                    className={({ isActive }) => cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10",
                      isActive ? "bg-secondary/15 text-primary font-bold shadow-sm" : "text-slate-600"
                    )}
                  >
                    {page.title}
                  </NavLink>
                </NavigationMenuItem>
              ))}

              {user && (
                <NavigationMenuItem>
                  <NavLink
                    to="/booking"
                    className={({ isActive }) => cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10",
                      isActive ? "bg-secondary/15 text-primary font-bold shadow-sm" : "text-slate-600"
                    )}
                  >
                    Bookings
                  </NavLink>
                </NavigationMenuItem>
              )}

              <NavigationMenuItem>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10",
                    isActive ? "bg-secondary/15 text-primary font-bold shadow-sm" : "text-slate-600"
                  )}
                >
                  Contact
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {userName && (
            <span className="hidden rounded-full bg-secondary/15 px-4 py-2 text-xs font-bold text-primary md:inline-flex border border-secondary/10">
              Hi, {userName}
            </span>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/signup")}
                className="rounded-xl font-semibold hover:bg-secondary/10 text-primary cursor-pointer"
              >
                Register
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-secondary text-white rounded-xl shadow-md glow-hover transition-all duration-300 px-6 py-2 font-semibold cursor-pointer"
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all duration-300 px-6 py-2 font-semibold cursor-pointer"
            >
              Logout
            </Button>
          )}
        </div>

        <button
          className="md:hidden p-2 text-slate-700 hover:bg-secondary/10 rounded-xl transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/tours", label: "Tours" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => cn(
                "block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-secondary/10 hover:text-primary transition-all duration-200",
                isActive ? "bg-secondary/15 text-primary font-bold shadow-sm" : ""
              )}
            >
              {item.label}
            </NavLink>
          ))}

          {dynamicPages.map((page) => (
            <NavLink
              key={page.slug}
              to={`/${page.slug}`}
              onClick={() => setOpen(false)}
              className={({ isActive }) => cn(
                "block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-secondary/10 hover:text-primary transition-all duration-200",
                isActive ? "bg-secondary/15 text-primary font-bold shadow-sm" : ""
              )}
            >
              {page.title}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/booking"
              onClick={() => setOpen(false)}
              className={({ isActive }) => cn(
                "block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-secondary/10 hover:text-primary transition-all duration-200",
                isActive ? "bg-secondary/15 text-primary font-bold shadow-sm" : ""
              )}
            >
              Bookings
            </NavLink>
          )}

          <div className="pt-4 flex flex-col gap-3 border-t border-slate-100">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  className="w-full rounded-xl font-semibold border-slate-200 hover:bg-slate-50 cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                    setOpen(false);
                  }}
                >
                  Register
                </Button>
                <Button
                  className="bg-primary hover:bg-secondary text-white w-full rounded-xl shadow-md font-semibold cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                className="bg-rose-600 hover:bg-rose-700 text-white w-full rounded-xl shadow-md font-semibold cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
