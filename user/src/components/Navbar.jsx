import React, { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu-style";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { GET_WEBPAGES } from "../resources/server-API";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/tours", label: "Tours" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Unable to read signed-in user data:", error);
  }
  const userName = user?.name ? user.name.split(" ")[0] : null;
  const [dynamicPages, setDynamicPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get(GET_WEBPAGES);
        if (response.data.status) {
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

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-[rgba(255,255,255,0.82)] backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-10">
        <button type="button" className="flex items-center gap-3 text-left" onClick={() => navigate("/")}>
          <img
            src="logo.png"
            alt="Explore Pakistan logo"
            className="h-10 w-10 rounded-full object-cover shadow-sm transition-transform duration-300 hover:rotate-6 md:h-12 md:w-12"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=100";
            }}
          />
          <div className="hidden sm:block">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Explore Pakistan</p>
            <p className="text-[10px] font-medium text-slate-500">Travel simplified.</p>
          </div>
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) => cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10 hover:text-primary",
                      isActive ? "bg-secondary/15 text-primary shadow-sm" : "text-slate-600"
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
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10 hover:text-primary",
                      isActive ? "bg-secondary/15 text-primary shadow-sm" : "text-slate-600"
                    )}
                  >
                    {page.title}
                  </NavLink>
                </NavigationMenuItem>
              ))}

              {user && (
                <NavigationMenuItem>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10 hover:text-primary",
                      isActive ? "bg-secondary/15 text-primary shadow-sm" : "text-slate-600"
                    )}
                  >
                    Dashboard
                  </NavLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {userName && (
            <span className="hidden rounded-full border border-secondary/10 bg-secondary/10 px-3 py-2 text-[11px] font-bold text-primary md:inline-flex">
              Hi, {userName}
            </span>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/signup")}
                className="rounded-xl px-4 py-2 font-semibold text-primary hover:bg-secondary/10"
              >
                Register
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-secondary"
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="rounded-xl bg-rose-600 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-rose-700"
            >
              Logout
            </Button>
          )}
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 transition hover:bg-secondary/10 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-5 shadow-lg backdrop-blur md:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={closeMenu}
                className={({ isActive }) => cn(
                  "block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200",
                  isActive ? "bg-secondary/15 text-primary shadow-sm" : "text-slate-700 hover:bg-secondary/10 hover:text-primary"
                )}
              >
                {item.label}
              </NavLink>
            ))}

            {dynamicPages.map((page) => (
              <NavLink
                key={page.slug}
                to={`/${page.slug}`}
                onClick={closeMenu}
                className={({ isActive }) => cn(
                  "block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200",
                  isActive ? "bg-secondary/15 text-primary shadow-sm" : "text-slate-700 hover:bg-secondary/10 hover:text-primary"
                )}
              >
                {page.title}
              </NavLink>
            ))}

            {user && (
              <NavLink
                to="/profile"
                onClick={closeMenu}
                className={({ isActive }) => cn(
                  "block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200",
                  isActive ? "bg-secondary/15 text-primary shadow-sm" : "text-slate-700 hover:bg-secondary/10 hover:text-primary"
                )}
              >
                Dashboard
              </NavLink>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-slate-200 font-semibold text-primary hover:bg-slate-50"
                  onClick={() => {
                    navigate("/signup");
                    closeMenu();
                  }}
                >
                  Register
                </Button>
                <Button
                  className="w-full rounded-xl bg-primary font-semibold text-white hover:bg-secondary"
                  onClick={() => {
                    navigate("/login");
                    closeMenu();
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                className="w-full rounded-xl bg-rose-600 font-semibold text-white hover:bg-rose-700"
                onClick={() => {
                  handleLogout();
                  closeMenu();
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
